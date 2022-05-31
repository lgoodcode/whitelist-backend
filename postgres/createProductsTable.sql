-- Table: public.products

DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id character(10) COLLATE pg_catalog."default" NOT NULL,
    brand character varying(50) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL DEFAULT 0,
    discount decimal NOT NULL DEFAULT 0,
    isnew boolean NOT NULL DEFAULT false,
	featured boolean NOT NULL DEFAULT false,
    images character varying(200)[] COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;