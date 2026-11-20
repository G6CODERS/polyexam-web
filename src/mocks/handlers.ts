import { faker } from '@faker-js/faker';

import { getPolyExamPublicAPIMock } from '@/lib/api/generated.msw';

// Keep generated Faker output stable across runs, screenshots, and tests.
faker.seed(42);

export const handlers = getPolyExamPublicAPIMock();
