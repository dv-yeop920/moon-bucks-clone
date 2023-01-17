/* 요구 사항 
step1 Todo 메뉴 추가
[*] 메뉴의 이름을 입력 받고 엔터 키를 치면 메뉴가 추가 된다
[*] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가 된다
[*] 추가 되는 메뉴의 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"><ul/> 안에 삽입 되야 한다
[*] 총 메뉴 갯수를 count 하여 상단에 보여 준다 => count total
[*] 메뉴가 추가 되고 나면 , input은 반드시 초기화 된다
[*] 사용자 입력값이 빈 값이라면 추가 되지 않는다.


step2 Todo 메뉴 수정
[*] 메뉴의 수정 버튼 클릭 이벤트를 받고 , 메뉴 수정하는 모달창이 뜬다
[*] 모달창에서 신규 메뉴명을 입력 받고 , 확인 버튼을 누르면 메뉴가 수정 된다.

step3 Todo 메뉴 삭제
[] 메뉴삭제 버튼 클릭 이벤트를 받고 , 메뉴 삭제 컨펌 모달창이 뜬다
[] 확인 버튼을 클릭 하면 메뉴가 삭제 된다
[] 총 메뉴 갯수를 count 하여 수정된 메뉴 갯수를 상태에 보여 준다. */

const userInput = document.querySelector('#espresso-menu-name');
const userSubmitButton = document.querySelector('#espresso-menu-submit-button');
const menuForm = document.querySelector('#espresso-menu-form');
const espressoMenuList = document.querySelector('#espresso-menu-list');
const menuCount = document.querySelector('.menu-count');




const app = function() {
    //form 태그가 자동으로 전송 되는 것을 막아 준다
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
    })
    //엔터나 클릭이 됐을 때 실행될 메뉴 리스트 내용을 담은 함수
    const addMenuList = () => {
        const userInputValue = userInput.value;
        const menuList = (value) => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${value}</span>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
                수정
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
                삭제
            </button>
            </li>`;
        }
        //userinput이 '' 이면 경고창을 띄우고 return 으로 실행을 종료 시켜 빈칸의 리스트가 작성이 안되게 한다
        if(userInputValue === ''){
            return alert('메뉴 이름을 작성해 주세요!');
        }
        console.log(menuList(userInputValue));
        espressoMenuList.insertAdjacentHTML("beforeend",menuList(userInputValue));
        //리스트를 작성할 때 마다 espressoMenuList에 있는 <li> 노드의 갯수 즉 , length 를 불러와 변수에 할당 후 갯수를 카운트 해준다.
        const menuCounter = espressoMenuList.querySelectorAll('li').length;
        menuCount.innerText = `총 ${menuCounter}개`;
        userInput.value = '';
    }
    //Enter 키를 눌렀을 때 userInput 에 입력된 value 를 출력
    userInput.addEventListener('keypress' , (event) => {
        if(event.key === 'Enter'){
            addMenuList(); 
        }
    });

    //submit 버튼을 클릭 했을 때 userInput 에 입력된 value 를 출력 
    userSubmitButton.addEventListener('click' , (event) => {
        if(userInput){
            addMenuList();
        }
    });
    
    //메뉴 이름 수정,삭제 하는 함수 . 이벤트 위임을 통해 수정 버튼 기능 구현
    espressoMenuList.addEventListener('click' , (event) => {
        const menuName = event.target.closest('li').querySelector('.menu-name');
        if(event.target.classList.contains('menu-edit-button')){
            const modifiedName = prompt('메뉴 수정' , menuName.innerText);
            menuName.innerText = modifiedName;
            //console.log(event.target);
        }
    })
}

app();






