enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}

enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  IN_DELIVERY = 'IN_DELIVERY',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export { UserStatus, ProductStatus, OrderStatus };
