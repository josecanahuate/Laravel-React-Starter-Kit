import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

//PERMISOS
import { can } from '@/helpers/can';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

interface Role {
    id: number,
    name: string,
    permissions: string[]
}

interface Permission {
    id: number,
    name: string,
    description?: string;
}

interface PageProps {
    flash: {
        message?: string
    },
    roles: Role[],
    permissions: Permission[],
 }

export default function Index({ roles, permissions }: PageProps) {

    const { flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
        //console.log("Delete" + id + name)
        if (confirm(`Delete Role - ${id}. ${name}`)) {
            //destroy(route('roles.destroy', id));
            router.delete(route('roles.destroy', id)); //otra forma
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {can('roles.create') && (<div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href={route('roles.create')}>
                        <Button>Create</Button>
                    </Link>
                </div>)}


            <div className='m-4'>
                <div>
                {flash.message && (
                  <Alert>
                    <AlertTitle>Notification!</AlertTitle>
                    <AlertDescription>
                       {flash.message}
                    </AlertDescription>
                    </Alert>
                )}
                </div>
            </div>

            {roles.length > 0 ? (
            <div className='m-4'>
                <Table>
                <TableCaption>List Of Roles</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className='text-center'>Editar</TableHead>
                    <TableHead className='text-center'>Eliminar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map(({id, name, permissions}) => (
                        <TableRow key={id}>
                        <TableCell className="font-medium">{id}</TableCell>
                        <TableCell>{name}</TableCell>

                        <TableCell>
                            {permissions.map((permission) =>
                            <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
                                {permission.description}
                            </span>
                            )}
                        </TableCell>

                        {can('roles.edit') && ( <TableCell className="text-right space-x-2">
                            <Link href={route('roles.edit', id)}>
                            <Button className='bg-amber-500 hover:bg-amber-700'>
                                Edit
                            </Button>
                            </Link>
                        </TableCell>)}

                        {can('roles.destroy') && (<TableCell className="text-right space-x-2">
                            <Button
                            disabled = { processing }
                            onClick = {() => handleDelete(id, name)}
                            className='bg-red-500 hover:bg-red-700'>
                                Delete
                            </Button>
                        </TableCell>)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            ) : (
              <p>Aún no hay Roles Creados</p>
            )}
        </div>
        </AppLayout>
    );
}
