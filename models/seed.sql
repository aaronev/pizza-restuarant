INSERT INTO
  customers (name, username, password, address, phone, payment)
VALUES
  ('aaron', 'aaron1','aaron','123 1st Street','555-555-5555', 'visa 1234-1234-1234-1234'),
  ('mark', 'mark1','mark','111 4st Street','555-123-5555', 'cash'),
  ('willis', 'willsome1','will','13 Tomorrow Street','333-555-1234', 'visa 3455-3455-3455-3455');

INSERT INTO
  preferences (customer_id, ingredients)
VALUES
  (1, 'pepperoni, salami, hotdogs'),
  (2, 'potato chips, salsa, avocados'),
  (3, 'cheese');

INSERT INTO
  drinks (description, manufacturer, supplier, price)
VALUES
  ('heavy carbonated, dark', 'coca-cola', 'coke', '$2'),
  ('heavy carbonated clear', 'sprite', 'coke', '$2'),
  ('heavy carbonated dark', 'pepsi', 'pepsi', '$2'),
  ('colorful non-carbonated', 'gatorade', 'gatorade', '$2'),
  ('water', 'Desani', 'coke', '$2');

INSERT INTO
  pizza (size, types, ingredients, price, happy_hour)
VALUES
  ('small', 'thin crust', 'pepperoni', '$3', '$2'),
  ('medium', 'thick crust', 'combo', '$5', '$4'),
  ('large', 'thin crust', 'pepperoni', '$6', '$5'),
  ('large', 'thick crust', 'combo', '$8', '$6');