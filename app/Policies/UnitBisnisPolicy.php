<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\UnitBisnis;
use Illuminate\Auth\Access\HandlesAuthorization;

class UnitBisnisPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:UnitBisnis');
    }

    public function view(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('View:UnitBisnis');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:UnitBisnis');
    }

    public function update(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('Update:UnitBisnis');
    }

    public function delete(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('Delete:UnitBisnis');
    }

    public function restore(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('Restore:UnitBisnis');
    }

    public function forceDelete(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('ForceDelete:UnitBisnis');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:UnitBisnis');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:UnitBisnis');
    }

    public function replicate(AuthUser $authUser, UnitBisnis $unitBisnis): bool
    {
        return $authUser->can('Replicate:UnitBisnis');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:UnitBisnis');
    }

}