/* 요구 사항 
step1 Todo 메뉴 추가
[] 메뉴의 이름을 입력 받고 엔터 키를 치면 메뉴가 추가 된다
[] 추가 되는 메뉴의 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"><ul/> 안에 삽입 되야 한다
[] 총 메뉴 갯수를 count 하여 상단에 보여 준다 => count total
[] 메뉴가 추가 되고 나면 , input은 반드시 초기화 된다
[] 사용자 입력값이 빈 값이라면 추가 되지 않는다.

step2 Todo 메뉴 수정
[] 메뉴의 수정 버튼 클릭 이벤트를 받고 , 메뉴 수정하는 모달창이 뜬다
[] 모달창에서 신규 메뉴명을 입력 받고 , 확인 버튼을 누르면 메뉴가 수정 된다.

step3 Todo 메뉴 삭제
[] 메뉴삭제 버튼 클릭 이벤트를 받고 , 메뉴 삭제 컨펌 모달창이 뜬다
[] 확인 버튼을 클릭 하면 메뉴가 삭제 된다
[] 총 메뉴 갯수를 count 하여 수정된 메뉴 갯수를 상태에 보여 준다. */

const userInput = document.querySelector('#espresso-menu-name');
const userSubmitButton = document.querySelector('#espresso-menu-submit-button');
const menuForm = document.querySelector('#espresso-menu-form');

const app = function() {
    //form 태그가 자동으로 전송 되는 것을 막아 준다
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
    })

    userInput.addEventListener('keypress' , (event) => {
        if(event.key === 'Enter'){
            console.log(userInput.value);
        }
    });

    userSubmitButton.addEventListener('click' , (event) => {
        while(userInput){
            console.log(userInput.value);
            break;
        }
    });
}
app();