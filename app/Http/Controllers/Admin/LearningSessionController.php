<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Centre;
use App\Models\LearningSession;
use App\Models\Subject;
use App\Models\User;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningSessionController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/learning-sessions/index', [
            'sessions' => LearningSession::with([
                'centre',
                'subject',
                'teacher',
            ])
                ->latest('session_date')
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/learning-sessions/create', [
            'centres' => Centre::where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),

            'subjects' => Subject::where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),

            'teachers' => User::whereHas('role', function ($query) {
                $query->where('name', 'Teacher');
            })
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name', 'centre_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'centre_id' => ['required', 'exists:centres,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'teacher_id' => ['required', 'exists:users,id'],
            'class_group' => ['required', 'in:Class A,Class B'],
            'topic' => ['required', 'string', 'max:255'],
            'session_date' => ['required', 'date'],
        ]);

        $teacher = User::with('role')
            ->findOrFail($validated['teacher_id']);

        if (!$teacher->role || $teacher->role->name !== 'Teacher') {
            return back()->withErrors([
                'teacher_id' => 'Please select a valid teacher.',
            ])->withInput();
        }

        $session = LearningSession::create([
            ...$validated,
            'status' => 'Scheduled',
        ]);

        ActivityLogger::log(
            'learning_session.created',
            "Created a {$session->subject->name} learning session for {$session->class_group}.",
            $session
        );

        return redirect()
            ->route('admin.learning-sessions.index')
            ->with('success', 'Learning session created successfully.');
    }

    public function show(LearningSession $learningSession)
    {
        $learningSession->load([
            'centre',
            'subject',
            'teacher',
        ]);

        return Inertia::render('admin/learning-sessions/show', [
            'session' => $learningSession,
        ]);
    }

    public function edit(LearningSession $learningSession)
    {
        return Inertia::render('admin/learning-sessions/edit', [
            'session' => $learningSession->load([
                'centre',
                'subject',
                'teacher',
            ]),

            'centres' => Centre::where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),

            'subjects' => Subject::where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),

            'teachers' => User::whereHas('role', function ($query) {
                $query->where('name', 'Teacher');
            })
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name', 'centre_id']),
        ]);
    }

    public function update(Request $request, LearningSession $learningSession)
    {
        $validated = $request->validate([
            'centre_id' => ['required', 'exists:centres,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'teacher_id' => ['required', 'exists:users,id'],
            'class_group' => ['required', 'in:Class A,Class B'],
            'topic' => ['required', 'string', 'max:255'],
            'session_date' => ['required', 'date'],
            'status' => [
                'required',
                'in:Scheduled,Delivered,Cancelled,Rescheduled',
            ],
        ]);

        $teacher = User::with('role')
            ->findOrFail($validated['teacher_id']);

        if (!$teacher->role || $teacher->role->name !== 'Teacher') {
            return back()->withErrors([
                'teacher_id' => 'Please select a valid teacher.',
            ])->withInput();
        }

        $learningSession->update($validated);

        ActivityLogger::log(
            'learning_session.updated',
            "Updated the {$learningSession->subject->name} learning session for {$learningSession->class_group}.",
            $learningSession
        );

        return redirect()
            ->route('admin.learning-sessions.show', $learningSession->id)
            ->with('success', 'Learning session updated successfully.');
    }
}
