<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    //USERS ROUTE
    Route::resource('users', UserController::class)->except([
    'show']);

    Route::resource('roles', RoleController::class)->except([
    'show']);

    Route::resource('roles', RoleController::class)->except([
    'show'])->only(["create", "store"])
    ->middleware("permission:roles.create");

    Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');

    Route::post('/products', [ProductController::class, 'store'])
    ->name('products.store');

    Route::get('/products/create', [ProductController::class, 'create'])
    ->name('products.create');

    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
    ->name('products.edit');

    Route::put('/products/{product}', [ProductController::class, 'update'])
    ->name('products.update');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
    ->name('products.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
