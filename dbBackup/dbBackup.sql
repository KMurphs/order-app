--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

-- Started on 2019-10-21 13:51:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16491)
-- Name: order_app; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA order_app;


ALTER SCHEMA order_app OWNER TO postgres;

--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA order_app; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA order_app IS 'standard public schema';


--
-- TOC entry 658 (class 1247 OID 16594)
-- Name: orderStatus; Type: TYPE; Schema: order_app; Owner: postgres
--

CREATE TYPE order_app."orderStatus" AS ENUM (
    'Created',
    'Placed',
    'Processed',
    'Shipped',
    'Delivered',
    'Closed',
    'Cancelled',
    'Expired'
);


ALTER TYPE order_app."orderStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 16498)
-- Name: clients_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.clients_table (
    id integer NOT NULL,
    surname character varying(15) DEFAULT 'None'::character varying NOT NULL,
    firstnames character varying(30) DEFAULT 'None None'::character varying NOT NULL,
    email character varying(100) DEFAULT 'None@None.None'::character varying,
    phone character varying(100) DEFAULT 0 NOT NULL,
    shipping_address character varying(100) DEFAULT 'None'::character varying NOT NULL,
    postal_address character varying(100),
    img_path character varying(100) DEFAULT '/img/NoImage.png'::character varying,
    country character varying(100) DEFAULT 'DRC'::character varying NOT NULL
);


ALTER TABLE order_app.clients_table OWNER TO postgres;

--
-- TOC entry 265 (class 1255 OID 16812)
-- Name: clients_add_one(character varying, character varying, character varying[], character varying[], character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: order_app; Owner: postgres
--

CREATE FUNCTION order_app.clients_add_one(in_surname character varying DEFAULT 'None'::character varying, in_firstnames character varying DEFAULT 'None None'::character varying, in_emails character varying[] DEFAULT ARRAY['none@none.none'::text], in_phones character varying[] DEFAULT ARRAY['0'::text], in_img_folder character varying DEFAULT 'default'::character varying, in_img_temp_name character varying DEFAULT 'NoImage.png'::character varying, in_country character varying DEFAULT 'None'::character varying, in_shipping_address character varying DEFAULT 'None'::character varying, in_postal_address character varying DEFAULT 'None'::character varying) RETURNS SETOF order_app.clients_table
    LANGUAGE plpgsql
    AS $$DECLARE
    ucount integer;
	entryid integer;
BEGIN
	
	SELECT COUNT(*) FROM order_app.clients_table INTO ucount
			WHERE surname = in_surname AND firstnames =  in_firstnames 
			GROUP BY surname, firstnames;
	
	IF NOT FOUND
	THEN		
	
		IF in_postal_address = 'None'
		THEN
			in_postal_address := in_shipping_address;
		END IF;

		
		INSERT INTO order_app.clients_table(surname, firstnames, email, phone, shipping_address, postal_address, img_path, country)
		VALUES (in_surname, in_firstnames, array_to_string(in_emails, '::'), array_to_string(in_phones, '::'), in_shipping_address, in_postal_address, '\\defaults\\NoImage.png', in_country);
	    SELECT id FROM order_app.clients_table INTO entryid WHERE surname = in_surname AND firstnames = in_firstnames AND email = array_to_string(in_emails, '::');
		
		
		IF in_img_temp_name != 'NoImage.png'
		THEN	
			in_img_temp_name := replace(replace(replace(concat('/', replace(in_img_folder,'\\\\','/'), '/', substr(md5(text(entryid)), 0, 10), '_', in_img_temp_name), '\\\\\\\\', '/'), '\\\\', '/'),'//', '/');
			UPDATE order_app.clients_table SET img_path = in_img_temp_name WHERE id = entryid;
		END IF;
		
	ELSE
		SELECT id FROM order_app.clients_table INTO entryid WHERE surname = in_surname AND firstnames = in_firstnames AND email = array_to_string(in_emails, '::');
	END IF;
	
	RETURN QUERY SELECT * FROM order_app.clients_table WHERE id = entryid;

END;$$;


ALTER FUNCTION order_app.clients_add_one(in_surname character varying, in_firstnames character varying, in_emails character varying[], in_phones character varying[], in_img_folder character varying, in_img_temp_name character varying, in_country character varying, in_shipping_address character varying, in_postal_address character varying) OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 16765)
-- Name: clients_get_all(); Type: FUNCTION; Schema: order_app; Owner: postgres
--

CREATE FUNCTION order_app.clients_get_all() RETURNS SETOF order_app.clients_table
    LANGUAGE plpgsql
    AS $$BEGIN
	RETURN QUERY SELECT * FROM order_app.clients_table ORDER BY id ASC;
END$$;


ALTER FUNCTION order_app.clients_get_all() OWNER TO postgres;

--
-- TOC entry 215 (class 1255 OID 16815)
-- Name: clients_update_one_by_id(integer, character varying[], character varying[]); Type: FUNCTION; Schema: order_app; Owner: postgres
--

CREATE FUNCTION order_app.clients_update_one_by_id(in_id integer, in_fields character varying[], in_values character varying[]) RETURNS SETOF order_app.clients_table
    LANGUAGE plpgsql
    AS $$DECLARE
	fieldcounter integer;
	querystring text;
	field text;
	colnames text[];
BEGIN
	
	fieldcounter := 1;
	querystring := '';
	colnames := ARRAY(SELECT column_name FROM information_schema.columns  WHERE table_schema = 'order_app' AND table_name = 'clients_table');
	
	FOREACH field IN ARRAY in_fields
	LOOP
		IF field = ANY(colnames)
		THEN
			querystring := CONCAT(querystring, ', ', in_fields[fieldcounter], ' = ''', in_values[fieldcounter], '''');
		END IF;
	
		fieldcounter := fieldcounter + 1;
	END LOOP;
	
	querystring := CONCAT('UPDATE order_app.clients_table SET ', substring(querystring, 2), ' WHERE id = ', in_id, ';');
	EXECUTE querystring;
	
	RETURN QUERY SELECT * FROM order_app.clients_table WHERE id = in_id;

END;$$;


ALTER FUNCTION order_app.clients_update_one_by_id(in_id integer, in_fields character varying[], in_values character varying[]) OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16496)
-- Name: clients_table_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.clients_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.clients_table_id_seq OWNER TO postgres;

--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 197
-- Name: clients_table_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.clients_table_id_seq OWNED BY order_app.clients_table.id;


--
-- TOC entry 214 (class 1259 OID 16713)
-- Name: joining_clients_orders_products_suppliers; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.joining_clients_orders_products_suppliers (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_supplier_map_id integer NOT NULL,
    client_id integer NOT NULL,
    product_qty integer DEFAULT 1 NOT NULL,
    actual_supplier_unit_cost_usd numeric(8,4) NOT NULL,
    actual_client_unit_cost_usd numeric(8,4) NOT NULL,
    product_order_date timestamp with time zone DEFAULT now() NOT NULL,
    product_expected_date timestamp with time zone DEFAULT now()
);


ALTER TABLE order_app.joining_clients_orders_products_suppliers OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16711)
-- Name: joining_clients_orders_products_suppliers_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.joining_clients_orders_products_suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.joining_clients_orders_products_suppliers_id_seq OWNER TO postgres;

--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 213
-- Name: joining_clients_orders_products_suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.joining_clients_orders_products_suppliers_id_seq OWNED BY order_app.joining_clients_orders_products_suppliers.id;


--
-- TOC entry 208 (class 1259 OID 16666)
-- Name: joining_product_photos; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.joining_product_photos (
    id integer NOT NULL,
    product_id integer NOT NULL,
    path character varying(100) NOT NULL
);


ALTER TABLE order_app.joining_product_photos OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16664)
-- Name: joining_product_photos_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.joining_product_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.joining_product_photos_id_seq OWNER TO postgres;

--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 207
-- Name: joining_product_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.joining_product_photos_id_seq OWNED BY order_app.joining_product_photos.id;


--
-- TOC entry 212 (class 1259 OID 16695)
-- Name: joining_product_suppliers; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.joining_product_suppliers (
    id integer NOT NULL,
    product_id integer NOT NULL,
    supplier_id integer NOT NULL,
    item_supplier_cost_usd numeric(8,4) NOT NULL,
    item_client_cost_usd numeric(8,4) NOT NULL,
    item_gain_usd numeric(8,4) NOT NULL,
    item_shipping_days integer NOT NULL,
    item_weblink character varying(100) NOT NULL,
    item_bare_cost_usd numeric(8,4),
    item_shipping_cost_usd numeric(8,4)
);


ALTER TABLE order_app.joining_product_suppliers OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16693)
-- Name: joining_product_suppliers_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.joining_product_suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.joining_product_suppliers_id_seq OWNER TO postgres;

--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 211
-- Name: joining_product_suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.joining_product_suppliers_id_seq OWNED BY order_app.joining_product_suppliers.id;


--
-- TOC entry 210 (class 1259 OID 16681)
-- Name: product_tags_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.product_tags_table (
    id integer NOT NULL,
    product_id integer NOT NULL,
    tag character varying(10) DEFAULT 'None'::character varying NOT NULL
);


ALTER TABLE order_app.product_tags_table OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16679)
-- Name: joining_product_tags_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.joining_product_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.joining_product_tags_id_seq OWNER TO postgres;

--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 209
-- Name: joining_product_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.joining_product_tags_id_seq OWNED BY order_app.product_tags_table.id;


--
-- TOC entry 204 (class 1259 OID 16613)
-- Name: orders_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.orders_table (
    id integer NOT NULL,
    status order_app."orderStatus" DEFAULT 'Created'::order_app."orderStatus" NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    expected_close_date timestamp with time zone DEFAULT now() NOT NULL,
    expected_payment_usd numeric(8,4) DEFAULT 0 NOT NULL,
    actual_close_date timestamp with time zone DEFAULT now(),
    received_payment_usd numeric(8,4)
);


ALTER TABLE order_app.orders_table OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16611)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 203
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.orders_id_seq OWNED BY order_app.orders_table.id;


--
-- TOC entry 206 (class 1259 OID 16646)
-- Name: payments_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.payments_table (
    payment_usd numeric(4,4) DEFAULT 0 NOT NULL,
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    payment_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE order_app.payments_table OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16644)
-- Name: payments_table_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.payments_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.payments_table_id_seq OWNER TO postgres;

--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 205
-- Name: payments_table_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.payments_table_id_seq OWNED BY order_app.payments_table.id;


--
-- TOC entry 202 (class 1259 OID 16568)
-- Name: products_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.products_table (
    id integer NOT NULL,
    name character varying(50) DEFAULT 'None'::character varying NOT NULL,
    category character varying(15) DEFAULT 'None'::character varying NOT NULL,
    subcategory character varying(15) DEFAULT 'None'::character varying NOT NULL,
    pref_supplier_id integer NOT NULL
);


ALTER TABLE order_app.products_table OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16566)
-- Name: products_table_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.products_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.products_table_id_seq OWNER TO postgres;

--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 201
-- Name: products_table_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.products_table_id_seq OWNED BY order_app.products_table.id;


--
-- TOC entry 200 (class 1259 OID 16522)
-- Name: suppliers_table; Type: TABLE; Schema: order_app; Owner: postgres
--

CREATE TABLE order_app.suppliers_table (
    id integer NOT NULL,
    surname character varying(15) DEFAULT 'None'::character varying NOT NULL,
    firstnames character varying(30) DEFAULT 'None None'::character varying,
    email character varying(30) DEFAULT 'None@None.None'::character varying,
    phone character varying(15) DEFAULT 0,
    website character varying(100) DEFAULT 'None'::character varying,
    office_address character varying(100) DEFAULT 'None'::character varying,
    postal_address character varying(100) DEFAULT 'None'::character varying
);


ALTER TABLE order_app.suppliers_table OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16520)
-- Name: suppliers_table_id_seq; Type: SEQUENCE; Schema: order_app; Owner: postgres
--

CREATE SEQUENCE order_app.suppliers_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE order_app.suppliers_table_id_seq OWNER TO postgres;

--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 199
-- Name: suppliers_table_id_seq; Type: SEQUENCE OWNED BY; Schema: order_app; Owner: postgres
--

ALTER SEQUENCE order_app.suppliers_table_id_seq OWNED BY order_app.suppliers_table.id;


--
-- TOC entry 2781 (class 2604 OID 16501)
-- Name: clients_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.clients_table ALTER COLUMN id SET DEFAULT nextval('order_app.clients_table_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 16716)
-- Name: joining_clients_orders_products_suppliers id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_clients_orders_products_suppliers ALTER COLUMN id SET DEFAULT nextval('order_app.joining_clients_orders_products_suppliers_id_seq'::regclass);


--
-- TOC entry 2810 (class 2604 OID 16669)
-- Name: joining_product_photos id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_photos ALTER COLUMN id SET DEFAULT nextval('order_app.joining_product_photos_id_seq'::regclass);


--
-- TOC entry 2813 (class 2604 OID 16698)
-- Name: joining_product_suppliers id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_suppliers ALTER COLUMN id SET DEFAULT nextval('order_app.joining_product_suppliers_id_seq'::regclass);


--
-- TOC entry 2801 (class 2604 OID 16616)
-- Name: orders_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.orders_table ALTER COLUMN id SET DEFAULT nextval('order_app.orders_id_seq'::regclass);


--
-- TOC entry 2809 (class 2604 OID 16650)
-- Name: payments_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.payments_table ALTER COLUMN id SET DEFAULT nextval('order_app.payments_table_id_seq'::regclass);


--
-- TOC entry 2811 (class 2604 OID 16684)
-- Name: product_tags_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.product_tags_table ALTER COLUMN id SET DEFAULT nextval('order_app.joining_product_tags_id_seq'::regclass);


--
-- TOC entry 2797 (class 2604 OID 16571)
-- Name: products_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.products_table ALTER COLUMN id SET DEFAULT nextval('order_app.products_table_id_seq'::regclass);


--
-- TOC entry 2789 (class 2604 OID 16525)
-- Name: suppliers_table id; Type: DEFAULT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.suppliers_table ALTER COLUMN id SET DEFAULT nextval('order_app.suppliers_table_id_seq'::regclass);


--
-- TOC entry 2970 (class 0 OID 16498)
-- Dependencies: 198
-- Data for Name: clients_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.clients_table (id, surname, firstnames, email, phone, shipping_address, postal_address, img_path, country) FROM stdin;
41	testup24	testup52	test@test.com	0027-606644523	dfdfs	dfdfs	/imgs/20190921/3416a75f4_1571654846815.jpg	sdfsdf
39	Celine	GMC Kibonge	kibongesp@gmail.com	0027-762564713	543 Leyds Street Muckleneuk PRetoria	543 Leyds Street Muckleneuk PRetoria	/imgs/20190921/d67d8ab4f_1571645564545.jpeg	South Africa
40	Kibonge	Stephane Patay	KibongeSP@gmail.com	0027-762564713	543 Leyds Street Muckleneuk Pretoria	543 Leyds Street Muckleneuk Pretoria	/imgs/20190921/d645920e3_1571651314095.jpg	South Africa
\.


--
-- TOC entry 2986 (class 0 OID 16713)
-- Dependencies: 214
-- Data for Name: joining_clients_orders_products_suppliers; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.joining_clients_orders_products_suppliers (id, order_id, product_supplier_map_id, client_id, product_qty, actual_supplier_unit_cost_usd, actual_client_unit_cost_usd, product_order_date, product_expected_date) FROM stdin;
\.


--
-- TOC entry 2980 (class 0 OID 16666)
-- Dependencies: 208
-- Data for Name: joining_product_photos; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.joining_product_photos (id, product_id, path) FROM stdin;
\.


--
-- TOC entry 2984 (class 0 OID 16695)
-- Dependencies: 212
-- Data for Name: joining_product_suppliers; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.joining_product_suppliers (id, product_id, supplier_id, item_supplier_cost_usd, item_client_cost_usd, item_gain_usd, item_shipping_days, item_weblink, item_bare_cost_usd, item_shipping_cost_usd) FROM stdin;
\.


--
-- TOC entry 2976 (class 0 OID 16613)
-- Dependencies: 204
-- Data for Name: orders_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.orders_table (id, status, creation_date, expected_close_date, expected_payment_usd, actual_close_date, received_payment_usd) FROM stdin;
\.


--
-- TOC entry 2978 (class 0 OID 16646)
-- Dependencies: 206
-- Data for Name: payments_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.payments_table (payment_usd, id, order_id, product_id, payment_date) FROM stdin;
\.


--
-- TOC entry 2982 (class 0 OID 16681)
-- Dependencies: 210
-- Data for Name: product_tags_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.product_tags_table (id, product_id, tag) FROM stdin;
\.


--
-- TOC entry 2974 (class 0 OID 16568)
-- Dependencies: 202
-- Data for Name: products_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.products_table (id, name, category, subcategory, pref_supplier_id) FROM stdin;
\.


--
-- TOC entry 2972 (class 0 OID 16522)
-- Dependencies: 200
-- Data for Name: suppliers_table; Type: TABLE DATA; Schema: order_app; Owner: postgres
--

COPY order_app.suppliers_table (id, surname, firstnames, email, phone, website, office_address, postal_address) FROM stdin;
\.


--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 197
-- Name: clients_table_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.clients_table_id_seq', 41, true);


--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 213
-- Name: joining_clients_orders_products_suppliers_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.joining_clients_orders_products_suppliers_id_seq', 1, false);


--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 207
-- Name: joining_product_photos_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.joining_product_photos_id_seq', 1, false);


--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 211
-- Name: joining_product_suppliers_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.joining_product_suppliers_id_seq', 1, false);


--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 209
-- Name: joining_product_tags_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.joining_product_tags_id_seq', 1, false);


--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 203
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.orders_id_seq', 1, false);


--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 205
-- Name: payments_table_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.payments_table_id_seq', 1, false);


--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 201
-- Name: products_table_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.products_table_id_seq', 1, false);


--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 199
-- Name: suppliers_table_id_seq; Type: SEQUENCE SET; Schema: order_app; Owner: postgres
--

SELECT pg_catalog.setval('order_app.suppliers_table_id_seq', 1, false);


--
-- TOC entry 2819 (class 2606 OID 16503)
-- Name: clients_table client_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.clients_table
    ADD CONSTRAINT client_id PRIMARY KEY (id);


--
-- TOC entry 2837 (class 2606 OID 16718)
-- Name: joining_clients_orders_products_suppliers client_order_product_supplier_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_clients_orders_products_suppliers
    ADD CONSTRAINT client_order_product_supplier_id PRIMARY KEY (id);


--
-- TOC entry 2825 (class 2606 OID 16623)
-- Name: orders_table order_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.orders_table
    ADD CONSTRAINT order_id PRIMARY KEY (id);


--
-- TOC entry 2827 (class 2606 OID 16653)
-- Name: payments_table payment_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.payments_table
    ADD CONSTRAINT payment_id PRIMARY KEY (id);


--
-- TOC entry 2829 (class 2606 OID 16671)
-- Name: joining_product_photos photo_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_photos
    ADD CONSTRAINT photo_id PRIMARY KEY (id);


--
-- TOC entry 2831 (class 2606 OID 16673)
-- Name: joining_product_photos photo_pathname; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_photos
    ADD CONSTRAINT photo_pathname UNIQUE (path);


--
-- TOC entry 2823 (class 2606 OID 16576)
-- Name: products_table product_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.products_table
    ADD CONSTRAINT product_id PRIMARY KEY (id);


--
-- TOC entry 2835 (class 2606 OID 16700)
-- Name: joining_product_suppliers product_supplier_link; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_suppliers
    ADD CONSTRAINT product_supplier_link PRIMARY KEY (id);


--
-- TOC entry 2821 (class 2606 OID 16527)
-- Name: suppliers_table supplier_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.suppliers_table
    ADD CONSTRAINT supplier_id PRIMARY KEY (id);


--
-- TOC entry 2833 (class 2606 OID 16687)
-- Name: product_tags_table tag_id; Type: CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.product_tags_table
    ADD CONSTRAINT tag_id PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 16729)
-- Name: joining_clients_orders_products_suppliers client_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_clients_orders_products_suppliers
    ADD CONSTRAINT client_id FOREIGN KEY (client_id) REFERENCES order_app.clients_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2839 (class 2606 OID 16654)
-- Name: payments_table order_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.payments_table
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES order_app.orders_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2845 (class 2606 OID 16719)
-- Name: joining_clients_orders_products_suppliers order_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_clients_orders_products_suppliers
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES order_app.suppliers_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2838 (class 2606 OID 16577)
-- Name: products_table pref_supplier_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.products_table
    ADD CONSTRAINT pref_supplier_id FOREIGN KEY (pref_supplier_id) REFERENCES order_app.suppliers_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2840 (class 2606 OID 16659)
-- Name: payments_table product_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.payments_table
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES order_app.products_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2841 (class 2606 OID 16674)
-- Name: joining_product_photos product_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_photos
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES order_app.products_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2842 (class 2606 OID 16688)
-- Name: product_tags_table product_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.product_tags_table
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES order_app.products_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2843 (class 2606 OID 16701)
-- Name: joining_product_suppliers product_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_suppliers
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES order_app.products_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2846 (class 2606 OID 16724)
-- Name: joining_clients_orders_products_suppliers product_supplier_map_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_clients_orders_products_suppliers
    ADD CONSTRAINT product_supplier_map_id FOREIGN KEY (product_supplier_map_id) REFERENCES order_app.joining_product_suppliers(id) ON DELETE RESTRICT;


--
-- TOC entry 2844 (class 2606 OID 16706)
-- Name: joining_product_suppliers supplier_id; Type: FK CONSTRAINT; Schema: order_app; Owner: postgres
--

ALTER TABLE ONLY order_app.joining_product_suppliers
    ADD CONSTRAINT supplier_id FOREIGN KEY (supplier_id) REFERENCES order_app.suppliers_table(id) ON DELETE RESTRICT;


--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA order_app; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA order_app TO order_app_user;


--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 658
-- Name: TYPE "orderStatus"; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON TYPE order_app."orderStatus" TO order_app_user;


--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 198
-- Name: TABLE clients_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.clients_table TO order_app_user;


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 265
-- Name: FUNCTION clients_add_one(in_surname character varying, in_firstnames character varying, in_emails character varying[], in_phones character varying[], in_img_folder character varying, in_img_temp_name character varying, in_country character varying, in_shipping_address character varying, in_postal_address character varying); Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON FUNCTION order_app.clients_add_one(in_surname character varying, in_firstnames character varying, in_emails character varying[], in_phones character varying[], in_img_folder character varying, in_img_temp_name character varying, in_country character varying, in_shipping_address character varying, in_postal_address character varying) TO order_app_user;


--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 228
-- Name: FUNCTION clients_get_all(); Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON FUNCTION order_app.clients_get_all() TO order_app_user;


--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 215
-- Name: FUNCTION clients_update_one_by_id(in_id integer, in_fields character varying[], in_values character varying[]); Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON FUNCTION order_app.clients_update_one_by_id(in_id integer, in_fields character varying[], in_values character varying[]) TO order_app_user;


--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 197
-- Name: SEQUENCE clients_table_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.clients_table_id_seq TO order_app_user;


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 214
-- Name: TABLE joining_clients_orders_products_suppliers; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.joining_clients_orders_products_suppliers TO order_app_user;


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 213
-- Name: SEQUENCE joining_clients_orders_products_suppliers_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.joining_clients_orders_products_suppliers_id_seq TO order_app_user;


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 208
-- Name: TABLE joining_product_photos; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.joining_product_photos TO order_app_user;


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 207
-- Name: SEQUENCE joining_product_photos_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.joining_product_photos_id_seq TO order_app_user;


--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 212
-- Name: TABLE joining_product_suppliers; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.joining_product_suppliers TO order_app_user;


--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 211
-- Name: SEQUENCE joining_product_suppliers_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.joining_product_suppliers_id_seq TO order_app_user;


--
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE product_tags_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.product_tags_table TO order_app_user;


--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 209
-- Name: SEQUENCE joining_product_tags_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.joining_product_tags_id_seq TO order_app_user;


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE orders_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.orders_table TO order_app_user;


--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 203
-- Name: SEQUENCE orders_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.orders_id_seq TO order_app_user;


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 206
-- Name: TABLE payments_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.payments_table TO order_app_user;


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 205
-- Name: SEQUENCE payments_table_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.payments_table_id_seq TO order_app_user;


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE products_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.products_table TO order_app_user;


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 201
-- Name: SEQUENCE products_table_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.products_table_id_seq TO order_app_user;


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE suppliers_table; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE order_app.suppliers_table TO order_app_user;


--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 199
-- Name: SEQUENCE suppliers_table_id_seq; Type: ACL; Schema: order_app; Owner: postgres
--

GRANT ALL ON SEQUENCE order_app.suppliers_table_id_seq TO order_app_user;


--
-- TOC entry 1770 (class 826 OID 16493)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: order_app; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON SEQUENCES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app GRANT ALL ON SEQUENCES  TO order_app_user;


--
-- TOC entry 1772 (class 826 OID 16495)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: order_app; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON TYPES  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON TYPES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app GRANT ALL ON TYPES  TO order_app_user;


--
-- TOC entry 1771 (class 826 OID 16494)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: order_app; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON FUNCTIONS  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app GRANT ALL ON FUNCTIONS  TO order_app_user;


--
-- TOC entry 1769 (class 826 OID 16492)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: order_app; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app REVOKE ALL ON TABLES  FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA order_app GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO order_app_user;


-- Completed on 2019-10-21 13:51:33

--
-- PostgreSQL database dump complete
--

