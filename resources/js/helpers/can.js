import { usePage } from '@inertiajs/react';

/**
 * Verifica si el usuario autenticado tiene un permiso específico.
 * @param {string} permission - El permiso a verificar (ej. "users.create").
 * @returns {boolean} - true si tiene el permiso, false si no.
 */
export function can(permission) {
    const { auth } = usePage().props || {};
    return auth?.permissions?.includes(permission) ?? false;
}