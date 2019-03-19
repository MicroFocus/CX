/* eslint camelcase: 0 */

export const success = {
    policy: {
        BluetoothMethod: {
            component_id: 'BluetoothMethod',
            data: {
                watch_on_device_removal: true
            },
            forced: false,
            hidden: false
        },
        SMSSender: {
            component_id: 'SMSSender',
            data: {
                messagebird: {
                    sender_name: 'Authasas',
                    password: null,
                    username: 'bioxs'
                },
                twilio: {
                    account_sid: 'AC89bc4d8ae38108e17b5648371b39b5c9',
                    auth_token: null,
                    use_copilot: false,
                    service_sid: '',
                    sender_phone: '+16086783619'
                },
                generic: {
                    service_url: '',
                    auth_username: '',
                    auth_password: null,
                    request_method: 'POST',
                    request_body: [],
                    request_body_secure_params: []
                },
                is_debug: true,
                sender_service: 'generic'
            },
            forced: false,
            hidden: false
        },
        WhitelistAdminUIOptions: {
            component_id: 'WhitelistAdminUIOptions',
            data: {
                whitelist: []
            },
            forced: false,
            hidden: false
        },
        VoiceOTPMethod: {
            component_id: 'VoiceOTPMethod',
            data: {
                body: 'OTP: {otp}',
                allow_override_recipient: true,
                otp_format: 'dec4',
                max_sent_otp_count: 3,
                enroll_no_recipient: false,
                enroll_no_recipient_msg:
                    'You do not have a phone number. Contact the administrator or Helpdesk and register your phone',
                recipient_attr: null,
                otp_period: 120
            },
            forced: false,
            hidden: false
        },
        CacheOptions: {
            component_id: 'CacheOptions',
            data: {
                cache_enabled: true
            },
            forced: false,
            hidden: false
        },
        LoginOptions: {
            component_id: 'LoginOptions',
            data: {
                nondefault_repos: [],
                default_repos: [
                    'LOCAL',
                    'TEST2'
                ]
            },
            forced: false,
            hidden: false
        },
        PasswordMethod: {
            component_id: 'PasswordMethod',
            data: {
                password_max_age: 42,
                password_check_complexity: false,
                password_min_length: 5
            },
            forced: false,
            hidden: false
        },
        ServicesDirectorOptions: {
            component_id: 'ServicesDirectorOptions',
            data: {
                host: null,
                username: null,
                is_enabled: false,
                public_address: null,
                password: null
            },
            forced: false,
            hidden: false
        },
        MultitenancyOptions: {
            component_id: 'MultitenancyOptions',
            data: {
                multitenancy_enabled: false
            },
            forced: false,
            hidden: false
        },
        LinkedChainsOptions: {
            component_id: 'LinkedChainsOptions',
            data: {
                hide_required_chain: false,
                linked_chains_enabled: false
            },
            forced: false,
            hidden: false
        },
        HttpsOptions: {
            component_id: 'HttpsOptions',
            data: {
                compression_enabled: false,
                frame_ancestor_urls: '',
                tls_1_0_enabled: false
            },
            forced: false,
            hidden: false
        },
        ADPasswordFilter: {
            component_id: 'ADPasswordFilter',
            data: {
                update_on_reset: true,
                update_on_change: true
            },
            forced: false,
            hidden: false
        },
        PublicUrlOptions: {
            component_id: 'PublicUrlOptions',
            data: {
                site_urls: {
                    '': 'https://global.sol'
                }
            },
            forced: false,
            hidden: false
        },
        EmailOTPMethod: {
            component_id: 'EmailOTPMethod',
            data: {
                body: 'User {user} from {endpoint} login to {event}. OTP: {otp}',
                subject: 'Login OTP',
                html: '<!DOCTYPE html>\n<title>OTP</title>\n<body>' +
                    'User {user} from {endpoint} login to {event}. OTP: <b>{otp}</b></body>',
                allow_override_recipient: true,
                otp_format: 'dec6',
                email_format: 'text',
                max_sent_otp_count: 3,
                enroll_no_recipient: false,
                enroll_no_recipient_msg:
                    'You do not have a e-mail. Contact the administrator or Helpdesk and register your e-mail',
                otp_period: 120
            },
            forced: false,
            hidden: false
        },
        PKIMethod: {
            component_id: 'PKIMethod',
            data: {},
            forced: false,
            hidden: false
        },
        EndpointManOptions: {
            component_id: 'EndpointManOptions',
            data: {
                create_need_auth: false
            },
            forced: false,
            hidden: false
        },
        WebAuthMethod: {
            component_id: 'WebAuthMethod',
            data: {
                idps: {}
            },
            forced: false,
            hidden: false,
            public_url: {
                site_urls: {
                    '': 'https://global.sol/webauth'
                },
                site_url_current: 'https://global.sol/webauth'
            }
        },
        SmartcardMethod: {
            component_id: 'SmartcardMethod',
            data: {
                tap_and_go_enabled: false
            },
            forced: false,
            hidden: false
        },
        GeoFencingOptions: {
            component_id: 'GeoFencingOptions',
            data: {
                geo_fencing_enabled: false
            },
            forced: false,
            hidden: false
        },
        BankIDMethod: {
            component_id: 'BankIDMethod',
            data: {
                certificate: null,
                test_mode_enabled: false,
                key: null
            },
            forced: false,
            hidden: false
        },
        HOTPMethod: {
            component_id: 'HOTPMethod',
            data: {
                otp_window: 10,
                otp_format: 'dec6'
            },
            forced: false,
            hidden: false
        },
        WebAuthOptions: {
            component_id: 'WebAuthOptions',
            data: {
                use_custom_messages: false,
                custom_branding_file: null,
                external_url: 'https://localhost/',
                is_custom_branding_enabled: false
            },
            forced: false,
            hidden: false
        },
        LdapMethod: {
            component_id: 'LdapMethod',
            data: {
                save_password: true,
                sspr_url: '',
                sspr_caption: '',
                cached_logon: false,
                sspr_enabled: false
            },
            forced: false,
            hidden: false
        },
        VoiceMethod: {
            component_id: 'VoiceMethod',
            data: {
                allow_override_recipient: true,
                pin_min_length: 3,
                enroll_no_recipient_msg:
                    'You do not have a phone number. Contact the administrator or Helpdesk and register your phone',
                enroll_no_recipient: false,
                pin_max_age: 42,
                recipient_attr: null
            },
            forced: false,
            hidden: false
        },
        SyslogOptions: {
            component_id: 'SyslogOptions',
            data: {
                socktype: 'UDP',
                is_enabled: false,
                port: 514,
                host: 'syslog.server.ip'
            },
            forced: false,
            hidden: false
        },
        LogoOptions: {
            component_id: 'LogoOptions',
            data: {
                text: '',
                logo_lg: [],
                url: '',
                use_image: false,
                logo_mini: []
            },
            forced: false,
            hidden: false
        },
        OobOptions: {
            component_id: 'OobOptions',
            data: {
                oob_daemon_host: 'https://127.0.0.1',
                verify_ssl: true
            },
            forced: false,
            hidden: false,
            public_url: {
                site_urls: {
                    '': 'https://global.sol/oob'
                },
                site_url_current: 'https://global.sol/oob'
            }
        },
        SmartphoneMethod: {
            component_id: 'SmartphoneMethod',
            data: {
                totp_length: 6,
                push_salt_ttl: 30,
                learn_timeout: 60,
                totp_time_window: 300,
                vendor: 'authasas',
                auth_salt_ttl: 60,
                push_proxy_url: 'https://proxy.authasas.com/OobProxy/servicejson.svc',
                mobile_min_pin_length: '4',
                mobile_use_image: false,
                totp_step: 30,
                img_mobile_splash: '',
                img_mobile_about: '',
                server_url: 'http://137.135.245.31:5000/smartphone',
                google_project_id: null,
                mobile_require_pin: true,
                mobile_require_bio: false
            },
            forced: false,
            hidden: false,
            public_url: {
                site_urls: {
                    '': 'http://137.135.245.31:5000/smartphone'
                },
                legacy: true,
                site_url_current: 'http://137.135.245.31:5000/smartphone'
            }
        },
        SwisscomMethod: {
            component_id: 'SwisscomMethod',
            data: {
                certificate: null,
                ap_pwd: null,
                ap_id: '',
                digest: '',
                msg_prefix: '',
                mid_url: 'https://mobileid.swisscom.com/rest/service'
            },
            forced: false,
            hidden: false
        },
        FingerMethod: {
            component_id: 'FingerMethod',
            data: {
                fingers_number: 2,
                is_fingers_specified: false,
                threshold: 50,
                captures_number_per_finger: 3,
                fingers: []
            },
            forced: false,
            hidden: false
        },
        CustomCSSOptions: {
            component_id: 'CustomCSSOptions',
            data: {
                content: ''
            },
            forced: false,
            hidden: false
        },
        FaceMethod: {
            component_id: 'FaceMethod',
            data: {
                endpoint_url: '',
                access_key: null
            },
            forced: false,
            hidden: false
        },
        LockoutOptions: {
            component_id: 'LockoutOptions',
            data: {
                lock_in_repo: false,
                is_enabled: false,
                lockout_period: 300,
                failed_attempts: 3
            },
            forced: false,
            hidden: false
        },
        SecQuestMethod: {
            component_id: 'SecQuestMethod',
            data: {
                AllQuestions: {
                    '0': 'question #0',
                    '1': 'question #1',
                    '2': 'question #2',
                    '3': 'question #3',
                    '4': 'question #4',
                    '5': 'question #5',
                    '6': 'question #6',
                    '7': 'question #7',
                    '8': 'question #8',
                    '9': 'question #9'
                },
                CorrectQuestionsForLogon: 4,
                TotalQuestionsForLogon: 5,
                MinAnswerLength: 5
            },
            forced: false,
            hidden: false
        },
        KerberosOptions: {
            component_id: 'KerberosOptions',
            data: {
                sso_repo_id: null
            },
            forced: false,
            hidden: false
        },
        GoogleRecaptchaOptions: {
            component_id: 'GoogleRecaptchaOptions',
            data: {
                site_key: '',
                secret_key: null
            },
            forced: false,
            hidden: false
        },
        RadiusMethod: {
            component_id: 'RadiusMethod',
            data: {
                server: '213.80.163.138',
                secret: null,
                send_reponame: true,
                nas_identifier: null,
                authport: 1812
            },
            forced: false,
            hidden: false
        },
        HelpdeskOptions: {
            component_id: 'HelpdeskOptions',
            data: {
                require_user_credentials: true,
                allow_unlock_users: false
            },
            forced: false,
            hidden: false
        },
        DeleteMeOptions: {
            component_id: 'DeleteMeOptions',
            data: {
                delete_me_enabled: false
            },
            forced: false,
            hidden: false
        },
        SMSOTPMethod: {
            component_id: 'SMSOTPMethod',
            data: {
                body: 'User {user} from {endpoint} login to {event}. OTP: {otp}',
                allow_override_recipient: true,
                otp_format: 'dec6',
                max_sent_otp_count: 3,
                enroll_no_recipient: false,
                enroll_no_recipient_msg:
                    'You do not have a phone number. Contact the administrator or Helpdesk and register your phone',
                recipient_attr: null,
                otp_period: 120
            },
            forced: false,
            hidden: false
        },
        WinHelloMethod: {
            component_id: 'WinHelloMethod',
            data: {
                allow_specify_username: true
            },
            forced: false,
            hidden: false
        },
        MailSender: {
            component_id: 'MailSender',
            data: {
                sendmail_template: null,
                port: 23,
                tls: false,
                username: 'all@test123.ru',
                debug: 1,
                keyfile: null,
                password: null,
                sendmail_app: null,
                host: 'test123.ru',
                ssl: false,
                certfile: null,
                default_sender: null,
                queue_path: null
            },
            forced: false,
            hidden: false
        },
        TOTPMethod: {
            component_id: 'TOTPMethod',
            data: {
                otp_window: 4,
                allow_manual_enrollment: false,
                otp_format: 'dec6',
                use_key_uri_format_qr: false,
                otp_period: 30
            },
            forced: false,
            hidden: false
        },
        ReplicaOptions: {
            component_id: 'ReplicaOptions',
            data: {
                email_everyday: true,
                email_if_warning: true,
                admin_email: '',
                delete_old_endpoint_device: true
            },
            forced: false,
            hidden: false
        },
        EMERG_PASSWORD: {
            component_id: 'EMERG_PASSWORD',
            data: {
                password_check_complexity: false,
                allow_change: true,
                max_logon_count: 10,
                password_age: 3,
                password_min_length: 5
            },
            forced: false,
            hidden: false
        },
        VoiceSender: {
            component_id: 'VoiceSender',
            data: {
                twilio: {
                    account_sid: 'AC89bc4d8ae38108e17b5648371b39b5c9',
                    auth_token: null,
                    sender_phone: '+16086783619'
                }
            },
            forced: false,
            hidden: false,
            public_url: {
                site_urls: {
                    '': 'https://global.sol'
                },
                site_url_current: 'https://global.sol'
            }
        },
        U2fMethod: {
            component_id: 'U2fMethod',
            data: {
                disable_builtin_attestation_cert: false,
                facets_prefixes: [],
                facets_primary_suffx: '',
                check_attestation: false
            },
            forced: false,
            hidden: false
        },
        TemplateOptions: {
            component_id: 'TemplateOptions',
            data: {
                sharing_enabled: false,
                disable_reenrollment: false
            },
            forced: false,
            hidden: false
        },
        ADEnhancedFilter: {
            component_id: 'ADEnhancedFilter',
            data: {
                filter_enabled: false
            },
            forced: false,
            hidden: false
        }
    }
};
