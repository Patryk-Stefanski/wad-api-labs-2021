import express from 'express';
import uniqid from 'uniqid';
import asyncHandler from 'express-async-handler';
import {getActors } from '../tmdb-api';
import actorModel from './actorModel';


const router = express.Router(); 
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    const actors = await getActors(page);
    res.status(200).json(actors);
}));



// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await actorModel.findByActorDBId(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));


export default router;