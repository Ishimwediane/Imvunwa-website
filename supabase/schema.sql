-- ════════════════════════════════════════════════════════════════
-- Imvunwa Business Group — database schema + seed data
-- Run this in Supabase → SQL Editor → New query → Run.
-- Safe to re-run: it drops and recreates the tables.
-- ════════════════════════════════════════════════════════════════

-- ── Reset ───────────────────────────────────────────────────────
drop table if exists project_images       cascade;
drop table if exists project_subcategories cascade;
drop table if exists project_categories    cascade;
drop table if exists team_members          cascade;
drop table if exists services              cascade;
drop table if exists site_content          cascade;

-- ── Site text (key → value) ─────────────────────────────────────
create table site_content (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

-- ── Services ────────────────────────────────────────────────────
create table services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  image_url   text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Team members ────────────────────────────────────────────────
create table team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  image_url  text,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

-- ── Projects: categories → subcategories → images ───────────────
create table project_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create table project_subcategories (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references project_categories(id) on delete cascade,
  name        text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table project_images (
  id             uuid primary key default gen_random_uuid(),
  subcategory_id uuid not null references project_subcategories(id) on delete cascade,
  image_url      text not null,
  caption        text,
  sort_order     int  not null default 0,
  created_at     timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════
-- Row Level Security
--   • Anyone (visitors) can READ content  → public website
--   • Only signed-in admins can WRITE      → the dashboard
-- ════════════════════════════════════════════════════════════════
alter table site_content          enable row level security;
alter table services              enable row level security;
alter table team_members          enable row level security;
alter table project_categories    enable row level security;
alter table project_subcategories enable row level security;
alter table project_images        enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'site_content','services','team_members',
    'project_categories','project_subcategories','project_images'
  ]
  loop
    execute format('create policy "public read %1$s" on %1$s for select using (true);', t);
    execute format('create policy "admin write %1$s" on %1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ════════════════════════════════════════════════════════════════
-- Storage bucket for uploaded images (public read, admin write)
-- ════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "public read images"
  on storage.objects for select using (bucket_id = 'images');
create policy "admin upload images"
  on storage.objects for insert to authenticated with check (bucket_id = 'images');
create policy "admin update images"
  on storage.objects for update to authenticated using (bucket_id = 'images');
create policy "admin delete images"
  on storage.objects for delete to authenticated using (bucket_id = 'images');

-- ════════════════════════════════════════════════════════════════
-- Seed data (matches what is currently on the website)
-- ════════════════════════════════════════════════════════════════

-- Site text
insert into site_content (key, value) values
  ('hero_eyebrow',  'Imvunwa Business Group · Rwanda'),
  ('hero_title',    'Your One Stop Shop For Transforming Your Space'),
  ('hero_subtitle', 'A leading metal fabrication, painting, repair, and restoration company — delivering exceptional services across Rwanda.'),
  ('tagline',       'Your one stop shop for transforming your space'),
  ('description',   'Imvunwa is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients.'),
  ('phone',         '+250 787 782 226'),
  ('email',         'imvunwabusinessgroup@gmail.com'),
  ('address',       'Rwanda, Kigali, Kimironko'),
  ('hours',         'Mon–Sat, 11:00–23:00'),
  ('about_story',   'Imvunwa Business Group Ltd is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients. We specialise in transforming spaces through industrial services and product manufacturing, with a constant emphasis on precision engineering and quality finishes.'),
  ('mission',       'To transform spaces and empower businesses across Rwanda through high-quality metal fabrication, manufacturing, repair, and finishing — delivered with precision engineering and dependable craftsmanship.'),
  ('vision',        'To be Rwanda''s most trusted one stop shop for industrial services and product manufacturing — the first name businesses and homeowners think of when they want to transform their space.');

-- Services
insert into services (name, description, image_url, sort_order) values
  ('Manufacturing of Machines',          'Design and production of high-quality machines tailored to meet specific industrial needs.',        '/image/manufacturing.jpg', 1),
  ('Machine Repairment',                 'Comprehensive repair services for a wide range of machinery, with prompt diagnosis and effective solutions.', '/image/repairement.jpg', 2),
  ('Welding Services',                   'Top-tier welding services for both structural and custom projects, delivered with precision and safety.', '/image/welding1.png', 3),
  ('Painting Services',                  'Top-quality painting finishes for homes and businesses, with protective surface coating that lasts.', '/image/paint.jpg', 4),
  ('Electricity Installation and Repair','Professional electrical services including installation, repair, and maintenance by certified electricians.', '/image/electricity.jpg', 5),
  ('Plumbing Services',                  'Installations, repairs, and maintenance of water systems for residential and commercial spaces.', '/image/plumb.jpg', 6),
  ('Product Design',                     'Innovative product design services developed collaboratively using cutting-edge technology.', '/image/product1.jpg', 7);

-- Team
insert into team_members (name, role, image_url, sort_order) values
  ('NIYONZIMA Pascal',       'Co-Founder & CEO',                             '', 1),
  ('IRADUKUNDA Jean Michel', 'Co-Founder & Advertisement and Stock Manager', '/image/IRADUKUNDA.jpg', 2),
  ('Muhire Gaspard',         'Co-Founder & Production Manager',               '', 3),
  ('Claudine IMANIZABAYO',   'Co-Founder & Accountant',                      '', 4);

-- Project categories
insert into project_categories (name, slug, sort_order) values
  ('Welding Services',                    'welding',       1),
  ('Manufacturing of Machines',           'manufacturing', 2),
  ('Machine Repairment',                  'repair',        3),
  ('Painting Services',                   'painting',      4),
  ('Electricity Installation and Repair', 'electrical',    5),
  ('Plumbing Services',                   'plumbing',      6),
  ('Product Design',                      'design',        7);

-- Project subcategories
insert into project_subcategories (category_id, name, sort_order)
select id, s.name, s.ord from project_categories c
join (values
  ('welding','Doors & Gates',1),('welding','Roofing Frames',2),('welding','Structural Frames',3),
  ('manufacturing','Industrial Machines',1),('manufacturing','Product Fabrication',2),
  ('repair','Heavy Equipment',1),('repair','Precision Repair',2),
  ('painting','Anti-Corrosion Coating',1),('painting','Decorative Finishes',2),
  ('electrical','Industrial Wiring',1),
  ('plumbing','Industrial Piping',1),
  ('design','Design & Prototyping',1)
) as s(slug,name,ord) on c.slug = s.slug;

-- Project images (a starter set per subcategory — add more in the dashboard)
insert into project_images (subcategory_id, image_url, caption, sort_order)
select sc.id, img.url, img.caption, img.ord
from project_subcategories sc
join project_categories c on c.id = sc.category_id
join (values
  ('welding','Doors & Gates','/image/project1.jpg','Steel security door — custom fabrication',1),
  ('welding','Doors & Gates','/image/project2.jpg','Ornamental gate — decorative metalwork',2),
  ('welding','Doors & Gates','/image/project4.jpg','Sliding compound gate — commercial property',3),
  ('welding','Roofing Frames','/image/project5.jpg','Steel roof truss — industrial building',1),
  ('welding','Roofing Frames','/image/welding1.png','Industrial roofing frame — structural welding',2),
  ('welding','Structural Frames','/image/execution.jpg','Building steel frame — structural assembly',1),
  ('welding','Structural Frames','/image/manufacturing.jpg','Steel structure assembly — industrial site',2),
  ('manufacturing','Industrial Machines','/image/manifa.jpg','Custom production machine — local factory',1),
  ('manufacturing','Industrial Machines','/image/mman.png','Production line equipment — full assembly',2),
  ('manufacturing','Product Fabrication','/image/product1.jpg','Custom fabricated industrial component',1),
  ('manufacturing','Product Fabrication','/image/ppic (1).jpg','Fabricated metal product — precision parts',2),
  ('repair','Heavy Equipment','/image/repaire.jpg','Heavy equipment overhaul — full restoration',1),
  ('repair','Heavy Equipment','/image/repairement.jpg','Machine component restoration & calibration',2),
  ('repair','Precision Repair','/image/pic1.jpg','Precision part repair — industrial equipment',1),
  ('painting','Anti-Corrosion Coating','/image/painting.jpg','Anti-corrosion surface coat — industrial facility',1),
  ('painting','Anti-Corrosion Coating','/image/paint.jpg','Industrial paint application — protective finish',2),
  ('painting','Decorative Finishes','/image/abou.jpg','Decorative interior finish — commercial space',1),
  ('electrical','Industrial Wiring','/image/electricity.jpg','Industrial electrical system — full installation',1),
  ('electrical','Industrial Wiring','/image/light bulb.jpeg','Lighting installation — commercial facility',2),
  ('plumbing','Industrial Piping','/image/plumb.jpg','Commercial plumbing network — full installation',1),
  ('plumbing','Industrial Piping','/image/plumbling.jpg','Industrial piping system — factory infrastructure',2),
  ('design','Design & Prototyping','/image/design.jpg','Product engineering design — industrial application',1),
  ('design','Design & Prototyping','/image/product.jpg','Prototype fabrication — pre-production model',2),
  ('design','Design & Prototyping','/image/product2.jpeg','Custom product design — finished prototype',3)
) as img(slug,sub,url,caption,ord)
  on c.slug = img.slug and sc.name = img.sub;

-- Done ✔  Next: create an admin user in Authentication → Users.
