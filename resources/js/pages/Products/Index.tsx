import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
}

interface PageProps {
    flash: {
        message?: string
    },
    products: Product[]
 }

export default function Index() {

    //const { products, flash } = usePage().props as PageProps;
    const { products, flash } = usePage().props as unknown as PageProps;

    const { processing, delete: destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
        //console.log("Delete" + name)
        if (confirm(`Delete Product - ${id}. ${name}`)) {
            destroy(route('products.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* BTN CREAR PRODUCTO */}
                {can('products.create') && (<div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href={route('products.create')}>
                    <Button>Create a Product</Button>
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

            {products.length > 0 ? (
            <div className='m-4'>
                <Table>
                <TableCaption>List Of Products</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='text-center'>Editar</TableHead>
                    {can('products.destroy') && (<TableHead className='text-center'>Eliminar</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>

                        {can('products.edit') && (<TableCell className="text-center space-x-2">
                            <Link href={route('products.edit', product.id)}>
                            <Button className='bg-amber-500 hover:bg-amber-700'>
                                Edit
                            </Button>
                            </Link>
                        </TableCell>)}

                        {can('products.destroy') && (<TableCell className="text-center space-x-2">
                            <Button
                            disabled = { processing }
                            onClick = {() => handleDelete(product.id, product.name)}
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
              <p>Aún no hay Productos Creados</p>
            )}
        </div>
        </AppLayout>
    );
}
