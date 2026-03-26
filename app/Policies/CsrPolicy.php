<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Csr;
use Illuminate\Auth\Access\HandlesAuthorization;

class CsrPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:Csr');
    }

    public function view(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('View:Csr');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:Csr');
    }

    public function update(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('Update:Csr');
    }

    public function delete(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('Delete:Csr');
    }

    public function restore(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('Restore:Csr');
    }

    public function forceDelete(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('ForceDelete:Csr');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:Csr');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:Csr');
    }

    public function replicate(AuthUser $authUser, Csr $csr): bool
    {
        return $authUser->can('Replicate:Csr');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:Csr');
    }

}