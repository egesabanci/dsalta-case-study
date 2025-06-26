import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import { Cache } from 'cache-manager';

export interface CacheOptions {
	ttl?: number;
}

export function Cached(
	keyGenerator: (...args: any[]) => string,
	options: CacheOptions = { ttl: 1000 * 60 * 60 }, // default 1-hour
) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		// eslint-disable-next-line
		const cacheManager = Inject(CACHE_MANAGER)(target, 'cacheManager');

		descriptor.value = async function (...args: any[]) {
			const cache: Cache = (this as any).cacheManager;
			const cacheKey = keyGenerator(...args);

			const cachedValue = await cache.get<any>(cacheKey);

			if (cachedValue) {
				return cachedValue;
			}

			const result = await originalMethod.apply(this, args);
			await cache.set<any>(cacheKey, result, options.ttl);

			return result;
		};

		return descriptor;
	};
}
