<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /* $permissions = [
            "users.view",
            "users.edit",
            "users.delete",
            "users.create",
            "products.view",
            "products.index",
            "products.create",
            "products.edit",
            "products.store",
            "products.update",
            "products.destroy",
            "roles.view",
            "roles.edit",
            "roles.delete",
            "roles.create",
        ]; */

        //$array = ['name' => 'John', 'age' => 30];

        /* foreach ($permissions as $key => $value) {
            Permission::create(["name" => $value]);
        } */
    }
}
