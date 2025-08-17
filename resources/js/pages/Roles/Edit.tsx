import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

//PERMISOS
import { can } from '@/helpers/can';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit a Role',
        href: '/roles/edit',
    },
];

export default function Create({ role, permissions, rolePermissions }) {

    const { data, setData, put, processing, errors } = useForm({
        name: role.name || "",
        permissions: rolePermissions || [],
    });

    function handleCheckBoxChange(permissionName, checked){
        if (checked) {
            setData("permissions", [...data.permissions, permissionName]);
        } else {
            setData("permissions", data.permissions.filter(name => name !== permissionName))
        }
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit a Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                   <Link href={route('roles.index')}>
                        <Button>Back</Button>
                    </Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <form method="POST" className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="product name">Role Name</Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="User Name"
                        />
                        {/* <InputError message={errors.name} className="mt-2" /> */}
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="product name">Permissions</Label>
                        {permissions.map((permission) =>
                        <label key={permission} className='flex items-center space-x-2'>
                            <input
                            type="checkbox"
                            className='form-checkbox h-5'
                            value={permission}
                            checked={data.permissions.includes(permission)}
                            onChange={(e) => handleCheckBoxChange(permission, e.target.checked)}
                            id={permission}
                            />
                            <span className='text-gray-800 capitalize'>{permission}</span>
                        </label>
                        )}

                        {/* <InputError message={errors.name} className="mt-2" /> */}
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update
                    </Button>
                </div>
            </form>
                </div>
            </div>
        </AppLayout>
    );
}
