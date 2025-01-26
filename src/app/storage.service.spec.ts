import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let platformId: Object;

  let mockLocalStorage: { [key: string]: string } = {};

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StorageService, { provide: PLATFORM_ID, useValue: 'browser' }]});

    service = TestBed.inject(StorageService);
    platformId = TestBed.inject(PLATFORM_ID);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => mockLocalStorage[key] = value);
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => delete mockLocalStorage[key]);
  });

  afterEach(() => {
    mockLocalStorage = {};
  });

  describe('Browser Environment', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          StorageService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should get an item from localStorage', () => {
      mockLocalStorage['testKey'] = 'testValue';
      const result = service.getItem('testKey');
      expect(result).toBe('testValue');
      expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
    });

    it('should return null if the item does not exist in localStorage', () => {
      const result = service.getItem('nonExistentKey');
      expect(result).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('nonExistentKey');
    });

    it('should set an item in localStorage', () => {
      service.setItem('testKey', 'testValue');
      expect(mockLocalStorage['testKey']).toBe('testValue');
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
    });

    it('should remove an item from localStorage', () => {
      mockLocalStorage['testKey'] = 'testValue';
      service.removeItem('testKey');
      expect(mockLocalStorage['testKey']).toBeUndefined();
      expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('Server Environment', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          StorageService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
      service = TestBed.inject(StorageService);
    });

    it('should return null for getItem on the server', () => {
      const result = service.getItem('testKey');
      expect(result).toBeNull();
      expect(localStorage.getItem).not.toHaveBeenCalled();
    });

    it('should not call setItem on the server', () => {
      service.setItem('testKey', 'testValue');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should not call removeItem on the server', () => {
      service.removeItem('testKey');
      expect(localStorage.removeItem).not.toHaveBeenCalled();
    });
  });
});
