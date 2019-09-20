import { EventDispatcher } from "event-dispatch";
import {
    controller,
    httpGet,
    httpPost,
    requestBody,
    requestParam
} from "inversify-express-utils";

import {
    eventDispatcher,
    movieRepository
} from "../../../domain/constants/decorators";
import { IMovieRepository } from "../../../domain/interfaces/repositories";
import { Movie } from "../../../domain/model/movie";
import events from "../../subscribers/events";

@controller("/api/movies")
export class MovieController {
    @movieRepository private readonly _movieRepository: IMovieRepository;
    @eventDispatcher private readonly _event: EventDispatcher;
    @httpGet("/")
    public async get(): Promise<Movie[]> {
        this._event.dispatch(events.user.signUp, {
            firstName: "Mark",
            email: "mark@gmail.com"
        });
        return await this._movieRepository.findAll();
    }
    @httpGet("/:id")
    public async getById(@requestParam("id") id: string) {
        return await this._movieRepository.findById(id);
    }
    @httpPost("/")
    public async post(@requestBody() movieDto: Movie) {
        return await this._movieRepository.save(movieDto);
    }
}
