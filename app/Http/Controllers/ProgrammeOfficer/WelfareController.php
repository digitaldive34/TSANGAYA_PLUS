<?php

namespace App\Http\Controllers\ProgrammeOfficer;

use App\Http\Controllers\Controller;
use App\Models\WelfareNeed;
use App\Models\Learner;
use App\Models\WelfareSupport;
use App\Support\ActivityLogger;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelfareController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'category' => [
                'nullable',
                'in:Clothing,Health,Learning Materials,Other',
            ],
            'status' => ['nullable', 'in:Open,In Progress,Resolved'],
        ]);

        return Inertia::render('programme-officer/welfare/index', [
            'welfareNeeds' => WelfareNeed::with([
                'learner.centre',
                'recordedBy',
            ])
                ->when($filters['search'] ?? null, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('description', 'like', "%{$search}%")
                            ->orWhereHas(
                                'learner',
                                fn ($learnerQuery) => $learnerQuery
                                    ->where('full_name', 'like', "%{$search}%")
                                    ->orWhere('learner_code', 'like', "%{$search}%")
                            )
                            ->orWhereHas(
                                'learner.centre',
                                fn ($centreQuery) => $centreQuery
                                    ->where('name', 'like', "%{$search}%")
                            );
                    });
                })
                ->when(
                    $filters['category'] ?? null,
                    fn ($query, $category) =>
                        $query->where('category', $category)
                )
                ->when(
                    $filters['status'] ?? null,
                    fn ($query, $status) => $query->where('status', $status)
                )
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'totalWelfareNeeds' => WelfareNeed::count(),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'category' => $filters['category'] ?? '',
                'status' => $filters['status'] ?? '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('programme-officer/welfare/create', [
            'learners' => Learner::with('centre')
                ->where('status', 'active')
                ->orderBy('full_name')
                ->get([
                    'id',
                    'learner_code',
                    'full_name',
                    'centre_id',
                ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'learner_id' => ['required', 'exists:learners,id'],
            'category' => ['required', 'in:Clothing,Health,Learning Materials,Other'],
            'description' => ['required', 'string'],
            'identified_date' => ['required', 'date'],
        ]);

        $welfareNeed = WelfareNeed::create([
            ...$validated,
            'status' => 'Open',
            'recorded_by' => auth()->id(),
        ]);

        ActivityLogger::log(
            'welfare_need.created',
            "Recorded a {$welfareNeed->category} welfare need for learner {$welfareNeed->learner->full_name}.",
            $welfareNeed
        );

        return redirect()
            ->route('programme-officer.welfare.index')
            ->with('success', 'Welfare need recorded successfully.');
    }

    public function show(WelfareNeed $welfareNeed)
    {
        $welfareNeed->load([
            'learner.centre',
            'recordedBy',
            'supports.recordedBy',
        ]);

        return Inertia::render('programme-officer/welfare/show', [
            'welfareNeed' => $welfareNeed,
        ]);
    }

    public function createSupport(WelfareNeed $welfareNeed)
    {
        $welfareNeed->load('learner.centre');

        return Inertia::render('programme-officer/welfare/supports/create', [
            'welfareNeed' => $welfareNeed,
        ]);
    }

    public function storeSupport(Request $request, WelfareNeed $welfareNeed)
    {
        $validated = $request->validate([
            'support_type' => ['required', 'in:Financial Assistance,Material Assistance,Referral,Other'],
            'description' => ['required', 'string'],
            'date_provided' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $support = WelfareSupport::create([
            ...$validated,
            'welfare_need_id' => $welfareNeed->id,
            'recorded_by' => auth()->id(),
        ]);

        ActivityLogger::log(
            'welfare_support.created',
            "Recorded {$support->support_type} for learner {$welfareNeed->learner->full_name}.",
            $support
        );

        return redirect()
            ->route('programme-officer.welfare.show', $welfareNeed->id)
            ->with('success', 'Welfare support recorded successfully.');
    }

    public function updateStatus(Request $request, WelfareNeed $welfareNeed)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:Open,In Progress,Resolved'],
        ]);

        $oldStatus = $welfareNeed->status;

        $welfareNeed->update([
            'status' => $validated['status'],
        ]);

        ActivityLogger::log(
            'welfare_need.status_updated',
            "Changed welfare need status for learner {$welfareNeed->learner->full_name} from {$oldStatus} to {$welfareNeed->status}.",
            $welfareNeed
        );

        return back()->with('success', 'Welfare status updated successfully.');
    }
}
