<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return match ($user->role->name) {
            'Admin' => redirect()->route('admin.dashboard'),
            'Programme Officer' => redirect()->route('programme-officer.dashboard'),
            'Teacher' => redirect()->route('teacher.dashboard'),
            default => abort(403, 'Your role does not have dashboard access.'),
        };
    }
}