-- Migrations will appear here as you chat with AI

create table ingredientes (
  id bigint primary key generated always as identity,
  nombre text,
  unidad_medida text,
  precio_unitario numeric
);

create table recetas (
  id bigint primary key generated always as identity,
  nombre text,
  "tamaño" text,
  porciones int
);

create table receta_ingredientes (
  id bigint primary key generated always as identity,
  receta_id bigint references recetas (id),
  ingrediente_id bigint references ingredientes (id),
  cantidad numeric,
  comentario text
);

create table costos_adicionales (
  id bigint primary key generated always as identity,
  receta_id bigint references recetas (id),
  concepto text,
  unidad_medida text,
  cantidad numeric,
  precio_total numeric
);

create table preparacion (
  id bigint primary key generated always as identity,
  receta_id bigint references recetas (id),
  proceso text,
  descripcion text,
  tiempo int
);

create table tiempos (
  id bigint primary key generated always as identity,
  receta_id bigint references recetas (id),
  tipo text,
  tiempo int
);

create table categorias_ingredientes (
  id bigint primary key generated always as identity,
  nombre text
);

create table proveedores (
  id bigint primary key generated always as identity,
  nombre text,
  contacto text,
  telefono text,
  email text
);

create table compras_ingredientes (
  id bigint primary key generated always as identity,
  ingrediente_id bigint references ingredientes (id),
  proveedor_id bigint references proveedores (id),
  cantidad numeric,
  precio_total numeric,
  fecha_compra date
);

create table clientes (
  id bigint primary key generated always as identity,
  nombre text,
  contacto text,
  telefono text,
  email text
);

create table pedidos (
  id bigint primary key generated always as identity,
  cliente_id bigint references clientes (id),
  receta_id bigint references recetas (id),
  cantidad int,
  fecha_pedido date,
  estado text
);

create table unidades_medida (
  id bigint primary key generated always as identity,
  nombre text,
  abreviatura text
);

create table usuarios (
  id bigint primary key generated always as identity,
  nombre_usuario text,
  "contraseña" text,
  rol text
);

create table historial_precios (
  id bigint primary key generated always as identity,
  ingrediente_id bigint references ingredientes (id),
  precio_anterior numeric,
  precio_nuevo numeric,
  fecha_cambio date
);

alter table ingredientes
rename to ingredients;

alter table recetas
rename to recipes;

alter table receta_ingredientes
rename to recipe_ingredients;

alter table costos_adicionales
rename to additional_costs;

alter table preparacion
rename to preparation;

alter table tiempos
rename to times;

alter table categorias_ingredientes
rename to ingredient_categories;

alter table proveedores
rename to suppliers;

alter table compras_ingredientes
rename to ingredient_purchases;

alter table clientes
rename to customers;

alter table pedidos
rename to orders;

alter table unidades_medida
rename to measurement_units;

alter table usuarios
rename to users;

alter table historial_precios
rename to price_history;

alter table ingredients
rename column nombre to name;

alter table ingredients
rename column unidad_medida to unit_of_measure;

alter table ingredients
rename column precio_unitario to unit_price;

alter table recipes
rename column nombre to name;

alter table recipes
rename column "tamaño" to size;

alter table recipes
rename column porciones to servings;

alter table recipe_ingredients
rename column receta_id to recipe_id;

alter table recipe_ingredients
rename column ingrediente_id to ingredient_id;

alter table recipe_ingredients
rename column cantidad to quantity;

alter table recipe_ingredients
rename column comentario to comment;

alter table additional_costs
rename column receta_id to recipe_id;

alter table additional_costs
rename column concepto to concept;

alter table additional_costs
rename column unidad_medida to unit_of_measure;

alter table additional_costs
rename column cantidad to quantity;

alter table additional_costs
rename column precio_total to total_price;

alter table preparation
rename column receta_id to recipe_id;

alter table preparation
rename column proceso to process;

alter table preparation
rename column descripcion to description;

alter table preparation
rename column tiempo to "time";

alter table times
rename column receta_id to recipe_id;

alter table times
rename column tipo to type;

alter table times
rename column tiempo to "time";

alter table ingredient_categories
rename column nombre to name;

alter table suppliers
rename column nombre to name;

alter table suppliers
rename column contacto to contact;

alter table suppliers
rename column telefono to phone;

alter table ingredient_purchases
rename column ingrediente_id to ingredient_id;

alter table ingredient_purchases
rename column proveedor_id to supplier_id;

alter table ingredient_purchases
rename column cantidad to quantity;

alter table ingredient_purchases
rename column precio_total to total_price;

alter table ingredient_purchases
rename column fecha_compra to purchase_date;

alter table customers
rename column nombre to name;

alter table customers
rename column contacto to contact;

alter table customers
rename column telefono to phone;

alter table orders
rename column cliente_id to customer_id;

alter table orders
rename column receta_id to recipe_id;

alter table orders
rename column cantidad to quantity;

alter table orders
rename column fecha_pedido to order_date;

alter table orders
rename column estado to status;

alter table measurement_units
rename column nombre to name;

alter table measurement_units
rename column abreviatura to abbreviation;

alter table users
rename column nombre_usuario to username;

alter table users
rename column "contraseña" to password;

alter table users
rename column rol to role;

alter table price_history
rename column ingrediente_id to ingredient_id;

alter table price_history
rename column precio_anterior to previous_price;

alter table price_history
rename column precio_nuevo to new_price;

alter table price_history
rename column fecha_cambio to change_date;