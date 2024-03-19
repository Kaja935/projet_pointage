<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocietyController;
use App\Http\Controllers\DepartmentController;

use App\Http\Controllers\UserController;

Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::get('departments',[DepartmentController::class,'index']);
Route::get('departments/{id}',[DepartmentController::class,'show']);
Route::post('departments',[DepartmentController::class,'store']);
Route::put('departments/{id}',[DepartmentController::class,'update']);
Route::delete('departments/{id}', [DepartmentController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('societies',SocietyController::class);

Route::get('/society',[DepartmentController::class,'society']);

Route::resource('departments',DepartmentController::class);
