<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{
    public function index(){

        //$cantidad_productos = Product::count(); // ADMIN

        $userId = Auth::id(); // id del usuario autenticado
        $cantidad_productos = Product::where('user_id', $userId) //SOLO USUARIOS AUTH
        ->count();

        $total_users = User::count(); // ADMIN
        $total_roles = Role::count(); // ADMIN
        $total_permisos = Permission::count(); // ADMIN

        /* $total_users = User::whereDoesntHave('roles', function ($query) {
            $query->where('id', 1); // Excluir usuarios con el role_id = 1 (Administradores)
        })->count(); */
        //dd("Productos" . $cantidad_productos, "Users" . $total_users);

        return Inertia::render('dashboard', [
            "totalUsers" => $total_users,
            "totalProducts" => $cantidad_productos,
            "totalRoles" => $total_roles,
            "totalPermisos" => $total_permisos,
        ]);
    }
}
