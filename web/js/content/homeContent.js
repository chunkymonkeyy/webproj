function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

        <h3 id="top">Home</h3>
        <h4>Welcome to SungJae Rice Mill</h4>
        <p>
            This is the website of 'SungJae Rice Mill' run by my grandparents. 
            <a target="_blank" href="https://www.producersrice.com"> >>reference website<< </a>
        </p>
     
        <ul>
            <li>
                Customers can order and pay for the products on the website.
            </li>
            <li>
                You can put the products you want to order in your shopping cart. And you can go to the login page or sign up for membership. 
            </li>
            <li>
                There will be 4 ~ 5 navigation bars. (About us/Products/Community or Notice/Account)
            </li>
            <li>
                I will use landscape photos and friendly images to induce people to purchase. It can increase the reliability of the product by adding a review board.
            </li>
        </ul>
        <pre>
          소개글
        안녕하십니까? 성재정미소 사장 이갑종 인사드립니다. 
        1964년 4월 첫 정미소문을 연 이래 어느덧 56년의 시간이 지났습니다. 
        먹을 것이 귀했던 시절 보리방아를 시작으로 최고의 쌀 품질을 위해 한결같이 노력해 왔습니다.
        질 좋은 쌀에 대한 저의 진심을 이제는 많은 분들이 인정해주시고 칭찬해 주심에 보람을 느낍니다. 
        제주도 입맛을 사로잡아 45년을 한결같이 거래중인 것 또한 저의 자부심입니다. 
        앞으로도 작지만 알찬 성재정미소는 고객분들께 최상의 쌀을 제공할 것을 다시 한번 약속드립니다. 감사합니다
        </pre>

        
       
    
    <p style="text-align:center;"> <!--정미소 이미지-->
                >정미소 전경<br>
        <img src="pics/rice+mill+background.jpg" alt="정미소전경" style="width:50%">
    </p>
    <p style="text-align:center;">
                상호명 : 성재정미소<br>
                사업자등록번호 : 876-88-10004<br>
                통신판매업 신고번호 : 제 2022-전남영암-0131호<br>
                대 표 : 이갑종<br>
                주 소 : 전남 영암군 서호면 성재리 성재길 12 (58436)<br>
                대표전화 : 061-472-7363<br>
    <a id="link_1" href="https://map.naver.com/v5/search/%EC%A0%84%EB%82%A8%20%EC%98%81%EC%95%94%EA%B5%B0%20%EC%84%9C%ED%98%B8%EB%A9%B4%20%EC%84%B1%EC%9E%AC%EB%A6%AC%20%EC%84%B1%EC%9E%AC%EA%B8%B8%2012" target="_blank">찾아오시는 길</a>
    </p>
    
    <a class="back-to-top" href="#/home" style="display:inline;position:fixed;bottom:50px;right:30px;"><img src="icons/arrow_up_circle.png" style="width:30px"><a/>
    
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
}