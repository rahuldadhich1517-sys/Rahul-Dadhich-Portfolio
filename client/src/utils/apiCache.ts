/**
 * API Cache Manager
 * Prevents duplicate requests and implements smart caching
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private requestInFlight = new Map<string, Promise<any>>();

  /**
   * Get or fetch data with automatic caching
   * Deduplicates in-flight requests
   */
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 24 * 60 * 60 * 1000 // 24 hours default
  ): Promise<T> {
    // Return cached data if valid
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    // Return in-flight request if exists (deduplication)
    if (this.requestInFlight.has(key)) {
      return this.requestInFlight.get(key)!;
    }

    // Fetch and cache
    const promise = fetcher()
      .then((data) => {
        this.cache.set(key, {
          data,
          timestamp: Date.now(),
          ttl,
        });
        this.requestInFlight.delete(key);
        return data;
      })
      .catch((error) => {
        this.requestInFlight.delete(key);
        throw error;
      });

    this.requestInFlight.set(key, promise);
    return promise;
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
    this.requestInFlight.clear();
  }
}

export const apiCache = new CacheManager();
