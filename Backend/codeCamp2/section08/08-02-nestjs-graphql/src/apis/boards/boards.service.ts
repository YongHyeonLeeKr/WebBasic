import { Injectable, Scope } from '@nestjs/common';
/**
 * ///
 * Scope.DEFAULT -> 싱글톤(new 한번)
 * Scope.REQEUST -> 매 요청마다 new 함
 * Scope.DEFAULT -> Transient 주입마다 new 함
 */
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
    fetchBoards(): string {
        return 'Hello World!';
    }
}
