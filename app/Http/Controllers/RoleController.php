<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Roles/Index', [
            "roles" => Role::with('permissions')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Roles/Create', [
            //"permissions" => Permission::pluck('name') // || {permission}
            "permissions" => Permission::all() // || {permission.name}
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            "name" => 'required',
            "permissions" => 'required',
        ]);

        $role = Role::create(["name" => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('message', 'Role Created Succesfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return Inertia::render('Roles/Edit', [
            "role" => $role,
            "rolePermissions" => $role->permissions()->pluck('name'),
            "permissions" => Permission::pluck('name') //|| usar solo {permission}
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
       // dd($request->all());
        $request->validate([
            "name" => 'required',
            "permissions" => 'required',
        ]);

        $role->name = $request->name;
        $role->save();

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('message', 'Role Updated Succesfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //dd($role);
        $role->delete();
        return redirect(route('roles.index', $role))->with('success', 'Rol Eliminado.');
    }
}
