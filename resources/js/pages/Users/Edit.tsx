import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New User',
        href: '/users/create',
    },
];

type UserUpdateForm =  {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface Props {
    user: UserUpdateForm
}


export default function Edit({user, userRoles, roles} : Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        roles: userRoles || []
    });

    function handleCheckBoxChange(roleName, checked){
    if (checked) {
        setData("roles", [...data.roles, roleName]);
    } else {
        setData("roles", data.roles.filter(name => name !== roleName))
    }
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <Link href={route('users.index')}>
                        <Button>Back</Button>
                    </Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <form method="POST" className="flex flex-col gap-6" onSubmit={handleUpdate}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="product name">User Name</Label>
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            tabIndex={2}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="text"
                            tabIndex={2}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="product name">Role</Label>
                        {roles.map((role) =>
                        <label key={role} className='flex items-center space-x-2'>
                            <input
                            type="checkbox"
                            className='form-checkbox h-5'
                            value={role}
                            checked={data.roles.includes(role)}
                            onChange={(e) => handleCheckBoxChange(role, e.target.checked)}
                            id={role}
                            />
                            <span className='text-gray-800 capitalize'>{role}</span>
                        </label>
                        )}

                        {/* <InputError message={errors.name} className="mt-2" /> */}
                        {errors.roles && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
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
