/* eslint camelcase: 0 */

import {methodIds} from '../../data/MethodData';

export const categoriesEnabled = {
    templates: [
        {
            id: '23c9b', method_id: 'PASSWORD:1', method_title: 'Password', comment: '', category_id: '',
            is_enrolled: true
        },
        {
            id: '23c9c', method_id: 'U2F:1', method_title: 'U2F', comment: '', category_id: '', is_enrolled: true
        },
        {
            id: '23c9d', method_id: 'FINGER:1', method_title: 'Fingerprint', comment: 'pinky and index',
            category_id: '', is_enrolled: true, data: {finger_positions: []}
        },
        {
            id: '23c9e', method_id: 'EMERG_PASSWORD:1', method_title: 'Emergency Password', comment: '',
            category_id: '0003', is_enrolled: true
        },
        {
            id: '1uf5l', method_id: 'OAUTH2:1', method_title: 'Oauth2', comment: 'Auto-created', category_id: '0003',
            is_enrolled: true
        },
        {
            id: '50bqz', method_id: 'U2F:1', method_title: 'U2F', comment: 'Yubikey5', category_id: '0003',
            is_enrolled: true
        },
        {
            id: '50brz', method_id: 'PASSWORD:1', method_title: 'Password', comment: 'Same one', category_id: '0001',
            is_enrolled: true
        }
    ]
};

export const noCategories = {
    templates: [
        {
            id: '23c9b', method_id: methodIds.CARD, method_title: 'Card', comment: '', category_id: '',
            is_enrolled: true
        },
        {
            id: '50bqz', method_id: methodIds.FINGER, method_title: 'Fingerprint', comment: '', category_id: '',
            is_enrolled: true, data: {finger_positions: []}
        },
        {
            id: 'ce39e', method_id: methodIds.PASSWORD, method_title: 'Password', comment: '', category_id: '',
            is_enrolled: true, data: {password_changed_at: '2018-07-18T19:44:56.247903'}
        },
        {
            id: '1uf5l', method_id: methodIds.FACE, method_title: 'Facial Recognition',
            comment: 'in sunglasses', category_id: '', is_enrolled: true
        },
        {
            id: 'i22jz', method_id: methodIds.SECQUEST, method_title: 'Security Questions',
            comment: 'answered at home', category_id: '', is_enrolled: true
        },
        {
            id: 'opjjj', method_id: methodIds.U2F, method_title: 'U2F', comment: '', category_id: '',
            is_enrolled: true
        }
    ]
};
