import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

type ProductForm = {
    name: string;
    price: string;
    description: string;
};

export default function Create() {

    const { data, setData, post, processing, errors, reset } = useForm<Required<ProductForm>>({
        name: '',
        price: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
        ...data,
        price: Number(data.price),  // convertir string a número
        }
        post(route('products.store', { data: payload }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <form method="POST" className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="product name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Product Name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Price</Label>
                        <Input
                            id="price"
                            type="text"
                            tabIndex={2}
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            tabIndex={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
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
