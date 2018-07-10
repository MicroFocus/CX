--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ex_app_risk_by_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_app_risk_by_level (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    low_risk integer,
    mild_risk integer,
    medium_risk integer,
    high_risk integer,
    critical_risk integer
);


ALTER TABLE ex_app_risk_by_level OWNER TO postgres;

--
-- Name: ex_app_risk_by_level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_app_risk_by_level_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_app_risk_by_level_id_seq OWNER TO postgres;

--
-- Name: ex_app_risk_by_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_app_risk_by_level_id_seq OWNED BY ex_app_risk_by_level.id;


--
-- Name: ex_governance_coverage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_governance_coverage (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    users integer,
    groups integer,
    applications integer,
    accounts integer,
    permissions integer,
    assignments integer
);


ALTER TABLE ex_governance_coverage OWNER TO postgres;

--
-- Name: ex_governance_coverage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_governance_coverage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_governance_coverage_id_seq OWNER TO postgres;

--
-- Name: ex_governance_coverage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_governance_coverage_id_seq OWNED BY ex_governance_coverage.id;


--
-- Name: ex_identity_lifecycle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_identity_lifecycle (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    joiners integer,
    leavers integer,
    profilechanges integer
);


ALTER TABLE ex_identity_lifecycle OWNER TO postgres;

--
-- Name: ex_identity_lifecycle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_identity_lifecycle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_identity_lifecycle_id_seq OWNER TO postgres;

--
-- Name: ex_identity_lifecycle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_identity_lifecycle_id_seq OWNED BY ex_identity_lifecycle.id;


--
-- Name: ex_joiners_by_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_joiners_by_location (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    joiners integer,
    location text
);


ALTER TABLE ex_joiners_by_location OWNER TO postgres;

--
-- Name: ex_joiners_by_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_joiners_by_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_joiners_by_location_id_seq OWNER TO postgres;

--
-- Name: ex_joiners_by_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_joiners_by_location_id_seq OWNED BY ex_joiners_by_location.id;


--
-- Name: ex_leavers_by_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_leavers_by_location (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    leavers integer,
    location text
);


ALTER TABLE ex_leavers_by_location OWNER TO postgres;

--
-- Name: ex_leavers_by_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_leavers_by_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_leavers_by_location_id_seq OWNER TO postgres;

--
-- Name: ex_leavers_by_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_leavers_by_location_id_seq OWNED BY ex_leavers_by_location.id;


--
-- Name: ex_user_risk_by_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ex_user_risk_by_level (
    id bigint NOT NULL,
    ts timestamp with time zone NOT NULL,
    lowrisk integer,
    mildrisk integer,
    mediumrisk integer,
    highrisk integer,
    criticalrisk integer
);


ALTER TABLE ex_user_risk_by_level OWNER TO postgres;

--
-- Name: ex_user_risk_by_level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ex_user_risk_by_level_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ex_user_risk_by_level_id_seq OWNER TO postgres;

--
-- Name: ex_user_risk_by_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ex_user_risk_by_level_id_seq OWNED BY ex_user_risk_by_level.id;


--
-- Name: ex_app_risk_by_level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_app_risk_by_level ALTER COLUMN id SET DEFAULT nextval('ex_app_risk_by_level_id_seq'::regclass);


--
-- Name: ex_governance_coverage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_governance_coverage ALTER COLUMN id SET DEFAULT nextval('ex_governance_coverage_id_seq'::regclass);


--
-- Name: ex_identity_lifecycle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_identity_lifecycle ALTER COLUMN id SET DEFAULT nextval('ex_identity_lifecycle_id_seq'::regclass);


--
-- Name: ex_joiners_by_location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_joiners_by_location ALTER COLUMN id SET DEFAULT nextval('ex_joiners_by_location_id_seq'::regclass);


--
-- Name: ex_leavers_by_location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_leavers_by_location ALTER COLUMN id SET DEFAULT nextval('ex_leavers_by_location_id_seq'::regclass);


--
-- Name: ex_user_risk_by_level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_user_risk_by_level ALTER COLUMN id SET DEFAULT nextval('ex_user_risk_by_level_id_seq'::regclass);


--
-- Data for Name: ex_app_risk_by_level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_app_risk_by_level (id, ts, low_risk, mild_risk, medium_risk, high_risk, critical_risk) FROM stdin;
1	2018-06-14 11:39:41.723-04	0	0	0	0	0
2	2018-06-14 12:19:32.704-04	0	0	0	0	0
3	2018-06-14 12:21:30.22-04	0	0	0	0	0
4	2018-06-14 12:28:26.509-04	0	0	0	0	0
5	2018-06-14 12:38:40.183-04	0	0	0	0	0
6	2018-06-14 12:51:59.125-04	1	0	0	0	0
7	2018-06-14 12:57:29.921-04	0	0	0	1	0
8	2018-06-14 13:14:18.506-04	0	0	0	1	0
9	2018-06-15 10:13:24.746-04	0	0	0	1	0
10	2018-06-18 10:27:44.683-04	0	0	0	1	0
11	2018-06-18 11:34:39.368-04	0	0	0	1	0
12	2018-06-18 11:41:54.438-04	0	0	0	1	0
13	2018-06-18 15:32:13.311-04	1	1	0	1	1
14	2018-06-19 15:44:31.17-04	1	1	0	1	1
\.


--
-- Name: ex_app_risk_by_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_app_risk_by_level_id_seq', 14, true);

update ex_app_risk_by_level set ts = ts + (select now() - max(f.ts) from ex_app_risk_by_level f);

--
-- Data for Name: ex_governance_coverage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_governance_coverage (id, ts, users, groups, applications, accounts, permissions, assignments) FROM stdin;
1	2018-06-14 11:39:41.387-04	0	0	0	0	0	0
2	2018-06-14 12:21:30.241-04	0	0	0	0	0	0
3	2018-06-14 12:28:26.533-04	70	22	0	0	0	0
4	2018-06-14 12:38:40.204-04	971	32	0	0	0	0
5	2018-06-14 12:51:59.146-04	971	32	1	0	0	0
6	2018-06-14 12:57:29.942-04	971	32	1	540	13	93
7	2018-06-14 13:14:18.539-04	971	32	1	540	13	93
8	2018-06-15 10:13:24.831-04	971	32	1	540	13	93
9	2018-06-18 10:27:44.164-04	971	32	1	540	13	93
10	2018-06-18 11:34:39.393-04	973	32	1	540	13	93
11	2018-06-18 11:41:54.463-04	973	32	1	540	13	93
12	2018-06-18 15:11:25.718-04	973	32	3	540	41	431
13	2018-06-18 15:17:22.673-04	973	32	4	540	97	3941
14	2018-06-18 15:32:13.673-04	973	32	4	540	176	5239
15	2018-06-19 15:44:30.531-04	973	32	4	540	176	5239
\.

update ex_governance_coverage set ts = ts + (select now() - max(f.ts) from ex_governance_coverage f);
--
-- Name: ex_governance_coverage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_governance_coverage_id_seq', 15, true);


--
-- Data for Name: ex_identity_lifecycle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_identity_lifecycle (id, ts, joiners, leavers, profilechanges) FROM stdin;
1	2018-06-14 11:39:41.758-04	0	0	0
2	2018-06-14 12:19:32.724-04	0	0	0
3	2018-06-14 12:21:30.256-04	0	0	0
4	2018-06-14 12:28:26.551-04	70	0	0
5	2018-06-14 12:38:40.224-04	971	0	15
6	2018-06-14 12:51:59.165-04	971	0	15
7	2018-06-14 12:57:29.964-04	971	0	986
8	2018-06-14 13:14:18.56-04	971	0	986
9	2018-06-15 10:13:24.885-04	971	10	986
10	2018-06-18 10:27:44.727-04	0	0	0
11	2018-06-18 11:34:39.407-04	2	0	2
12	2018-06-18 11:41:54.481-04	2	5	2
13	2018-06-19 15:44:31.219-04	2	0	975
\.


update ex_identity_lifecycle set ts = ts + (select now() - max(f.ts) from ex_identity_lifecycle f);
--
-- Name: ex_identity_lifecycle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_identity_lifecycle_id_seq', 13, true);


--
-- Data for Name: ex_joiners_by_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_joiners_by_location (id, ts, joiners, location) FROM stdin;
1	2018-06-14 12:28:26.57-04	70	\N
2	2018-06-14 12:38:40.247-04	299	Boston
3	2018-06-14 12:38:40.247-04	62	\N
4	2018-06-14 12:38:40.247-04	30	Houston
5	2018-06-14 12:38:40.247-04	151	Las Vegas
6	2018-06-14 12:38:40.247-04	74	New York
7	2018-06-14 12:38:40.247-04	168	San Francisco
8	2018-06-14 12:38:40.247-04	187	Chicago
9	2018-06-14 12:51:59.184-04	299	Boston
10	2018-06-14 12:51:59.184-04	62	\N
11	2018-06-14 12:51:59.184-04	30	Houston
12	2018-06-14 12:51:59.184-04	151	Las Vegas
13	2018-06-14 12:51:59.184-04	74	New York
14	2018-06-14 12:51:59.184-04	168	San Francisco
15	2018-06-14 12:51:59.184-04	187	Chicago
16	2018-06-14 12:57:29.985-04	299	Boston
17	2018-06-14 12:57:29.985-04	62	\N
18	2018-06-14 12:57:29.985-04	30	Houston
19	2018-06-14 12:57:29.985-04	74	New York
20	2018-06-14 12:57:29.985-04	151	Las Vegas
21	2018-06-14 12:57:29.985-04	168	San Francisco
22	2018-06-14 12:57:29.985-04	187	Chicago
23	2018-06-14 13:14:18.578-04	299	Boston
24	2018-06-14 13:14:18.578-04	62	\N
25	2018-06-14 13:14:18.578-04	30	Houston
26	2018-06-14 13:14:18.578-04	74	New York
27	2018-06-14 13:14:18.578-04	151	Las Vegas
28	2018-06-14 13:14:18.578-04	168	San Francisco
29	2018-06-14 13:14:18.578-04	187	Chicago
30	2018-06-14 15:30:47.171-04	299	Boston
31	2018-06-14 15:30:47.171-04	62	\N
32	2018-06-14 15:30:47.171-04	30	Houston
33	2018-06-14 15:30:47.171-04	74	New York
34	2018-06-14 15:30:47.171-04	151	Las Vegas
35	2018-06-14 15:30:47.171-04	168	San Francisco
36	2018-06-14 15:30:47.171-04	187	Chicago
37	2018-06-14 16:30:08.663-04	299	Boston
38	2018-06-14 16:30:08.663-04	62	\N
39	2018-06-14 16:30:08.663-04	30	Houston
40	2018-06-14 16:30:08.663-04	74	New York
41	2018-06-14 16:30:08.663-04	151	Las Vegas
42	2018-06-14 16:30:08.663-04	168	San Francisco
43	2018-06-14 16:30:08.663-04	187	Chicago
44	2018-06-15 10:13:24.919-04	299	Boston
45	2018-06-15 10:13:24.919-04	62	\N
46	2018-06-15 10:13:24.919-04	30	Houston
47	2018-06-15 10:13:24.919-04	74	New York
48	2018-06-15 10:13:24.919-04	151	Las Vegas
49	2018-06-15 10:13:24.919-04	168	San Francisco
50	2018-06-15 10:13:24.919-04	187	Chicago
51	2018-06-18 11:34:39.422-04	1	Boston
52	2018-06-18 11:34:39.422-04	1	Cambridge
53	2018-06-18 11:41:54.497-04	1	Boston
54	2018-06-18 11:41:54.497-04	1	Cambridge
55	2018-06-19 15:44:31.5-04	1	Boston
56	2018-06-19 15:44:31.5-04	1	Cambridge
\.

update ex_joiners_by_location set ts = ts + (select now() - max(f.ts) from ex_joiners_by_location f);
--
-- Name: ex_joiners_by_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_joiners_by_location_id_seq', 56, true);


--
-- Data for Name: ex_leavers_by_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_leavers_by_location (id, ts, leavers, location) FROM stdin;
1	2018-06-15 11:08:04.522951-04	10	Chicago
2	2018-06-18 02:52:09.522951-04	5	New York
\.

update ex_leavers_by_location set ts = ts + (select now() - max(f.ts) from ex_leavers_by_location f);

--
-- Name: ex_leavers_by_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_leavers_by_location_id_seq', 1, true);


--
-- Data for Name: ex_user_risk_by_level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ex_user_risk_by_level (id, ts, lowrisk, mildrisk, mediumrisk, highrisk, criticalrisk) FROM stdin;
1	2018-06-14 11:39:41.349-04	0	0	0	0	0
2	2018-06-14 12:19:32.787-04	0	0	0	0	0
3	2018-06-14 12:21:30.303-04	0	0	0	0	0
4	2018-06-14 12:28:26.606-04	70	0	0	0	0
5	2018-06-14 12:38:40.282-04	971	0	0	0	0
6	2018-06-14 12:51:59.226-04	971	0	0	0	0
7	2018-06-14 12:57:30.02-04	862	0	0	540	0
8	2018-06-14 13:14:18.616-04	862	0	0	540	0
9	2018-06-15 10:13:24.979-04	862	0	0	540	0
10	2018-06-18 10:27:43.899-04	862	0	0	540	0
11	2018-06-18 11:34:39.456-04	1295	0	0	540	0
12	2018-06-18 11:41:54.531-04	1295	0	0	540	0
13	2018-06-18 15:32:13.808-04	1289	510	4	30	0
14	2018-06-19 15:44:30.25-04	1289	510	4	30	0
\.

update ex_user_risk_by_level set ts = ts + (select now() - max(f.ts) from ex_user_risk_by_level f);

--
-- Name: ex_user_risk_by_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ex_user_risk_by_level_id_seq', 14, true);


--
-- Name: ex_app_risk_by_level ex_app_risk_by_level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_app_risk_by_level
    ADD CONSTRAINT ex_app_risk_by_level_pkey PRIMARY KEY (id);


--
-- Name: ex_governance_coverage ex_governance_coverage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_governance_coverage
    ADD CONSTRAINT ex_governance_coverage_pkey PRIMARY KEY (id);


--
-- Name: ex_identity_lifecycle ex_identity_lifecycle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_identity_lifecycle
    ADD CONSTRAINT ex_identity_lifecycle_pkey PRIMARY KEY (id);


--
-- Name: ex_joiners_by_location ex_joiners_by_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_joiners_by_location
    ADD CONSTRAINT ex_joiners_by_location_pkey PRIMARY KEY (id);


--
-- Name: ex_leavers_by_location ex_leavers_by_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_leavers_by_location
    ADD CONSTRAINT ex_leavers_by_location_pkey PRIMARY KEY (id);


--
-- Name: ex_user_risk_by_level ex_user_risk_by_level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ex_user_risk_by_level
    ADD CONSTRAINT ex_user_risk_by_level_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

