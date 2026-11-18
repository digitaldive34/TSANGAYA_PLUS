<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminDashboardController;

use App\Http\Controllers\Admin\CentreController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\LearningSessionController;

use App\Http\Controllers\ProgrammeOfficer\DashboardController as ProgrammeOfficerDashboardController;
use App\Http\Controllers\ProgrammeOfficer\LearnerController;
use App\Http\Controllers\ProgrammeOfficer\WelfareController;
use App\Http\Controllers\ProgrammeOfficer\MonitoringController;
use App\Http\Controllers\ProgrammeOfficer\ActivityController as ProgrammeOfficerActivityController;

use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\LearningSessionController as TeacherLearningSessionController;
use App\Http\Controllers\Teacher\AttendanceController as TeacherAttendanceController;
use App\Http\Controllers\Teacher\AssessmentController;
use App\Http\Controllers\Teacher\LearnerClassMovementController;


Route::inertia('/', 'welcome')->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');


    /*Admin Routes*/

    Route::middleware('role:Admin')->group(function () {

        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
            ->name('admin.dashboard');

        // Centres
        Route::get('/admin/centres', [CentreController::class, 'index'])
            ->name('admin.centres.index');

        Route::get('/admin/centres/create', [CentreController::class, 'create'])
            ->name('admin.centres.create');

        Route::post('/admin/centres', [CentreController::class, 'store'])
            ->name('admin.centres.store');

        Route::get('/admin/centres/{centre}', [CentreController::class, 'show'])
            ->name('admin.centres.show');

        Route::get('/admin/centres/{centre}/edit', [CentreController::class, 'edit'])
            ->name('admin.centres.edit');

        Route::put('/admin/centres/{centre}', [CentreController::class, 'update'])
            ->name('admin.centres.update');


        // Learning Sessions
        Route::get('/admin/learning-sessions', [LearningSessionController::class, 'index'])
            ->name('admin.learning-sessions.index');

        Route::get('/admin/learning-sessions/create', [LearningSessionController::class, 'create'])
            ->name('admin.learning-sessions.create');

        Route::post('/admin/learning-sessions', [LearningSessionController::class, 'store'])
            ->name('admin.learning-sessions.store');

        Route::get('/admin/learning-sessions/{learningSession}', [LearningSessionController::class, 'show'])
            ->name('admin.learning-sessions.show');

        Route::get('/admin/learning-sessions/{learningSession}/edit', [LearningSessionController::class, 'edit'])
            ->name('admin.learning-sessions.edit');

        Route::put('/admin/learning-sessions/{learningSession}', [LearningSessionController::class, 'update'])
            ->name('admin.learning-sessions.update');


        // Staff Management
        Route::get('/admin/users', [UserController::class, 'index'])
            ->name('admin.users.index');

        Route::get('/admin/users/create', [UserController::class, 'create'])
            ->name('admin.users.create');

        Route::post('/admin/users', [UserController::class, 'store'])
            ->name('admin.users.store');

        Route::get('/admin/users/{user}', [UserController::class, 'show'])
            ->name('admin.users.show');

        Route::get('/admin/users/{user}/edit', [UserController::class, 'edit'])
            ->name('admin.users.edit');

        Route::put('/admin/users/{user}', [UserController::class, 'update'])
            ->name('admin.users.update');


        // Activity Monitoring
        Route::get('/admin/activities', [ActivityController::class, 'index'])
            ->name('admin.activities.index');
    });


    /* Programme Officer Routes */

    Route::middleware('role:Programme Officer')->group(function () {

        Route::get('/programme-officer/dashboard', [ProgrammeOfficerDashboardController::class, 'index'])
            ->name('programme-officer.dashboard');

        Route::get('/programme-officer/monitoring/activities', [ProgrammeOfficerActivityController::class, 'index'])
            ->name('programme-officer.monitoring.activities');


        // Learners
        Route::get('/programme-officer/learners', [LearnerController::class, 'index'])
            ->name('programme-officer.learners.index');

        Route::get('/programme-officer/learners/create', [LearnerController::class, 'create'])
            ->name('programme-officer.learners.create');

        Route::get('/programme-officer/learners/{learner}', [LearnerController::class, 'show'])
            ->name('programme-officer.learners.show');

        Route::post('/programme-officer/learners', [LearnerController::class, 'store'])
            ->name('programme-officer.learners.store');

        Route::get('/programme-officer/learners/{learner}/edit', [LearnerController::class, 'edit'])
            ->name('programme-officer.learners.edit');

        Route::put('/programme-officer/learners/{learner}', [LearnerController::class, 'update'])
            ->name('programme-officer.learners.update');


        // Welfare
        Route::get('/programme-officer/welfare', [WelfareController::class, 'index'])
            ->name('programme-officer.welfare.index');

        Route::get('/programme-officer/welfare/create', [WelfareController::class, 'create'])
            ->name('programme-officer.welfare.create');

        Route::post('/programme-officer/welfare', [WelfareController::class, 'store'])
            ->name('programme-officer.welfare.store');

        Route::get('/programme-officer/welfare/{welfareNeed}', [WelfareController::class, 'show'])
            ->name('programme-officer.welfare.show');

        Route::get('/programme-officer/welfare/{welfareNeed}/supports/create', [WelfareController::class, 'createSupport'])
            ->name('programme-officer.welfare.supports.create');

        Route::post('/programme-officer/welfare/{welfareNeed}/supports', [WelfareController::class, 'storeSupport'])
            ->name('programme-officer.welfare.supports.store');

        Route::patch('/programme-officer/welfare/{welfareNeed}/status', [WelfareController::class, 'updateStatus'])
            ->name('programme-officer.welfare.status.update');


        // Read-only Monitoring
        Route::get('/programme-officer/monitoring/attendance', [MonitoringController::class, 'attendance'])
            ->name('programme-officer.monitoring.attendance');

        Route::get('/programme-officer/monitoring/assessments', [MonitoringController::class, 'assessments'])
            ->name('programme-officer.monitoring.assessments');
    });


    /* Teacher Routes*/

    Route::middleware('role:Teacher')->group(function () {

        Route::get('/teacher/dashboard', [TeacherDashboardController::class, 'index'])
            ->name('teacher.dashboard');


        // Assigned Learning Sessions
        Route::get('/teacher/sessions/{learningSession}', [TeacherLearningSessionController::class, 'show'])
            ->name('teacher.sessions.show');

        Route::patch('/teacher/sessions/{learningSession}/delivered', [TeacherLearningSessionController::class, 'markDelivered'])
            ->name('teacher.sessions.delivered');


        // Attendance
        Route::get('/teacher/sessions/{learningSession}/attendance', [TeacherAttendanceController::class, 'create'])
            ->name('teacher.sessions.attendance.create');

        Route::post('/teacher/sessions/{learningSession}/attendance', [TeacherAttendanceController::class, 'store'])
            ->name('teacher.sessions.attendance.store');


        // Assessments
        Route::get('/teacher/assessments', [AssessmentController::class, 'index'])
            ->name('teacher.assessments.index');

        Route::get('/teacher/assessments/register', [AssessmentController::class, 'show'])
            ->name('teacher.assessments.show');

        Route::post('/teacher/assessments/register', [AssessmentController::class, 'store'])
            ->name('teacher.assessments.store');


        // Learner Class Movement
        Route::post('/teacher/learners/{learner}/class-movement', [LearnerClassMovementController::class, 'store'])
            ->name('teacher.learners.class-movement.store');
    });

});


require __DIR__.'/settings.php';
