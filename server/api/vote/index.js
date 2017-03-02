'use strict';

import {Router} from 'express';
import * as controller from './vote.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);

module.exports = router;
