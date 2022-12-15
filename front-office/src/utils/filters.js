
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

    if (pets) { /* TODO */ }

    return res;
}

export function filterAvailableServices(services, filtered_providers) {

    if (!services) return [];
    if (!filtered_providers) return services;

    return services.filter(s => filtered_providers.some(p => p.service_type == s));
}