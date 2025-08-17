import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Roles',
        href: '/roles/create',
    },
];

interface Permission {
  id: number;
  name: string;
}

interface Props {
  permissions: Permission[];
}

export default function Create({ permissions }: Props) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[], // array de nombres de permisos seleccionados
    });


    function handleCheckBoxChange(permissionName: string, checked: boolean) {
    if (checked) {
      setData("permissions", [...data.permissions, permissionName]);
    } else {
      setData("permissions", data.permissions.filter((name) => name !== permissionName)
      );
    }
  }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Role" />
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
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="product name">Permisos</Label>
                        {permissions.map((permission) => (
                        <label key={permission.id} className='flex items-center space-x-2'>
                            <input
                            type="checkbox"
                            className='form-checkbox h-5'
                            value={permission.name}
                            onChange={(e) =>handleCheckBoxChange(permission.name, e.target.checked)}
                            />
                            <span className='text-gray-800 capitalize'>{permission.name}</span>
                        </label>
                        ))}
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create
                    </Button>
                </div>
            </form>
                </div>
            </div>
        </AppLayout>
    );
}
