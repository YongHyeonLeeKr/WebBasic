import React from 'react';
import Example from '../../../src/components/14-props-children-example';

export default function PropsChildrenPage() {
    return (
        <div>
        <div>++++++++빨간색 파란색 초록색 +++++++++++</div>
            <Example school='다람쥐 초등학교'>
                <div>
                    <input type="text" />
                    <div>저는 철수입니다.</div>
                    <button>클릭해주세요</button>
                </div>
            </Example>
        <div>++++++++빨간색 파란색 초록색 +++++++++++</div>
        </div>

    );
}