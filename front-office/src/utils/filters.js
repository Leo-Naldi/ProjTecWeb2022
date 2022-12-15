import { pet_sizes } from '../utils/defaultData';

function isWithin(size, min_size=null, max_size=null) {

    let res = true;
    const size_ind = pet_sizes.indexOf(size);

    if (min_size !== null) res = res && (pet_sizes.indexOf(min_size) <= size_ind);

    if (max_size !== null) res = res && (pet_sizes.indexOf(max_size) >= size_ind);

    return res;
}

function petTypeAllowed(provider, type) {

    return provider.pet_types.indexOf(type) !== -1;
}

export function filterProviders(providers, type, date, city, pets) {
    let res = [...providers];  // TODO make structured clone

    if (!res) {
        return [];
    }
    if (type !== null) {
        
        res = res.filter(provider => provider.service_type == type);
    }

    if (date !== null) { /* TODO serverside */ }

    if (city !== null) { res = res.filter(provider => provider.city == city) }

    if (pets) {
        for (let i = 0; i < pets.length; i++) {

            res = res.filter(provider => (petTypeAllowed(provider, pets[i].type) && 
                isWithin(pets[i].size, provider.pet_sizes_min, provider.pet_sizes_max)));
        }
    }

    return res;
}

export function filterAvailableServices(services, filtered_providers) {

    if (!services) return [];
    if (!filtered_providers) return services;

    return services.filter(s => filtered_providers.some(p => p.service_type == s));
}