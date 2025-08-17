<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //roles
        $role1 = Role::create(["name" => "Administrador", 'created_at' => now(), 'updated_at' => now()]);
        $role2 = Role::create(["name" => "Empleado", 'created_at' => now(), 'updated_at' => now()]);

        //DASHBOARD
        Permission::create(['name' => 'users.home', 'description' => 'Ver Dashboard'])->syncRoles([$role1, $role2]);

        //permisos de Administrador - Creacion de Usuarios
        Permission::create(['name' => 'users.index', 'description' => 'Ver Usuarios'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.create', 'description' => 'Crear Usuarios'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.edit', 'description' => 'Crear Usuarios'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.destroy', 'description' => 'Eliminar Usuarios'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.store', 'description' => 'Guardar Usuario'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.update', 'description' => 'Actualizar Usuario'])->syncRoles([$role1]);
        Permission::create(['name' => 'users.view', 'description' => 'Ver Dashboard'])->syncRoles([$role1]);

        //permisos de Usuario - Creacion de Productos
        Permission::create(['name' => 'products.index', 'description' => 'Ver Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.view', 'description' => 'Ver Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.edit', 'description' => 'Editar Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.create', 'description' => 'Crear Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.destroy', 'description' => 'Eliminar Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.store', 'description' => 'Guardar Productos'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'products.update', 'description' => 'Actualizar Productos'])->syncRoles([$role1, $role2]);

        //permisos de Administrador Roles y Permisos
        Permission::create(['name' => 'roles.view', 'description' => 'Ver Rol'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.index', 'description' => 'Ver Rol'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.create', 'description' => 'Crear Rol'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.edit', 'description' => 'Editar Rol'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.update', 'description' => 'Actualizar Rol'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.destroy', 'description' => 'Eliminar Rol'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.roles.edit', 'description' => 'Editar Rol'])->syncRoles([$role1]);


        //Permisos Generales - Menu Lateral
        #Permission::create(['name' => 'admin.comprobantes.index', 'description' => 'Comprobantes'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.estados.index', 'description' => 'Estados de los Usuarios'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.matriculados.index', 'description' => 'Matriculas'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.formularios.index', 'description' => 'Ver Formularios'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.pruebas.index', 'description' => 'Subir Pruebas'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.anuncios.edit', 'description' => 'Editar Anuncios'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.area.dashboard', 'description' => 'Admin Dashboard'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.users.configuracion', 'description' => 'Configuracion Usuarios'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.pruebas.aprobacion', 'description' => 'Aprobar Pre-Formularios'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.messages.destroy', 'description' => 'Eliminar Mensajes'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.cursos.edit', 'description' => 'Editar Curso Verano'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.categories.edit', 'description' => 'Editar Categorías'])->syncRoles([$role1]);
        #Permission::create(['name' => 'admin.categories.destroy', 'description' => 'Eliminar Categorías'])->syncRoles([$role1]);
    }
}
