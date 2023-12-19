import  { NextFunction, RequestHandler, Response, Request } from "express";
import axios from 'axios';
import {config } from '../../configs/index';
import { IFeed } from "../../interfaces/feed";

export const getFeed: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const appId = req.params.appId || '';
    const country = req.params.country || '';
    const sortBy = req.query?.sortBy;
    const page = req.query?.page;
    const params = `/${country}/rss/customerreviews/id=${appId}${sortBy ? `/sortBy=${sortBy}`: ''}${page ? `/page=${page}` : ''}/json`

    try {
        const response = await axios.get(config.baseUrl + params)
        res.status(200).json(response.data as IFeed)
    }catch (err: any){
        res.status(500).json({message: err.message})
    }
}