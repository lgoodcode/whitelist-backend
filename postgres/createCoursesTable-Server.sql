-- Table: public.courses

DROP TABLE IF EXISTS public.courses;

CREATE TABLE IF NOT EXISTS public.courses
(
    id CHAR (10) COLLATE pg_catalog."default" NOT NULL,
    title VARCHAR (50) COLLATE pg_catalog."default" NOT NULL,
    author VARCHAR (100) COLLATE pg_catalog."default" NOT NULL,
    published DATE NOT NULL,
    readTime INTEGER NOT NULL,
    content VARCHAR (1000) [] COLLATE pg_catalog."default" NOT NULL,
    imageURL VARCHAR (200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT courses_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.courses
    OWNER to xjpfxlue;