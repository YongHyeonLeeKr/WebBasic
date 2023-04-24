# Export 와 export Default 의 차이 




``` js
//utils.js

export  function math {
    return 
}

export  function date {
    return 
}

```

utils 라는 스크립트에 함수가 있다고하면 


``` js
//index.js
import { date,math } from './util.js';

```

이런식으로 다른 스크립트에서 import 해와서 사용 가능 
하지만 일일히 함수명을 입력해서 가져오는 것은 불편한 일..


``` js

import * as entireFunction from './util.js';

entireFunction.date();
entireFunction.math();
```

이런식으로  모든 함수명을 가져오는 동시에 as키워드로 entireFunction(개체명)지정 가능하다.
그런데 import뒤에 {} 나 * 없이 그냥 곧바로 기본으로 지정된 함수를 가져올 수 도 있는데
export default 기능을 쓰면 가능하다.


```js
// util

export  function math {
    return 
}

export  function date {
    return 
}

export default function util {
    //Logic
    return 
}
```

이런식으로 util 스크립트에서 기본적으로 util 함수를 내보낸다고 지정해두고 

``` js
//index.js
import  util from './util.js';

util.math() // 예시

```

이런식으로 사용이 가능하다.