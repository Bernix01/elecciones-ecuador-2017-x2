'use strict';

import {Router} from 'express';
import * as controller from './candidate.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/votes', controller.getVotes);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
