import { SVGProps } from 'react';

import { MenuList } from '@/types/global';

export const MENU_LIST: MenuList[] = [
  { id: 1, Icon: HomeIcon, ClickedIcon: ClickedHomeIcon, name: '홈', path: '/home' },
  { id: 2, Icon: TestIcon, ClickedIcon: ClickedTestIcon, name: '모의고사', path: '/exam' },
  { id: 3, Icon: CommunityIcon, ClickedIcon: ClickedCommunityIcon, name: '게시판', path: '/community' },
  { id: 4, Icon: StopwatchIcon, ClickedIcon: ClickedStopwatchIcon, name: '스톱워치', path: '/stopwatch' },
  { id: 5, Icon: MypageIcon, ClickedIcon: ClickedMypageIcon, name: '마이페이지', path: '/mypage' },
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={40}
        height={40}>
        <path fill="#D9D9D9" d="M0 0h40v40H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M9.833 31.833h6.75v-8.666c0-.33.112-.608.336-.832.223-.223.5-.335.831-.335h4.5c.33 0 .608.112.831.335.224.224.336.501.336.832v8.666h6.75V17.241c0-.223-.049-.424-.146-.604-.097-.181-.23-.34-.396-.48l-8.833-6.67A1.237 1.237 0 0020 9.221c-.306 0-.57.088-.792.264l-8.833 6.671a1.622 1.622 0 00-.396.48c-.097.18-.146.381-.146.604v14.592zm-1 0V17.25c0-.382.078-.734.235-1.055.156-.322.393-.59.71-.806l8.833-6.722a2.137 2.137 0 011.378-.473c.526 0 .992.158 1.4.473l8.833 6.722c.317.215.554.484.71.806.157.321.235.673.235 1.055v14.583c0 .26-.102.492-.306.695a.957.957 0 01-.694.305h-6.584c-.33 0-.607-.111-.83-.335a1.129 1.129 0 01-.336-.831V23h-4.834v8.667c0 .33-.111.607-.335.83-.224.224-.5.336-.831.336H9.833a.957.957 0 01-.694-.305.957.957 0 01-.306-.695z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}
function ClickedHomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
      <mask
        id="a"
        width={40}
        height={40}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <path fill="#D9D9D9" d="M0 0h40v40H0z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#0D0E10"
          d="M8.833 31.833V17.25q0-.573.235-1.055t.71-.806l8.833-6.722a2.14 2.14 0 0 1 1.378-.473q.788 0 1.4.473l8.833 6.722q.476.323.71.806.235.482.235 1.055v14.583q0 .396-.302.698a.96.96 0 0 1-.698.302h-6.084a1.13 1.13 0 0 1-.831-.335 1.13 1.13 0 0 1-.335-.831v-8q0-.497-.335-.832a1.13 1.13 0 0 0-.832-.335h-3.5a1.13 1.13 0 0 0-.832.335q-.335.334-.335.832v8q0 .496-.335.831a1.13 1.13 0 0 1-.831.335H9.833a.96.96 0 0 1-.698-.302.96.96 0 0 1-.302-.698"
        />
      </g>
    </svg>
  );
}

function TestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={41} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={40}>
        <path fill="#D9D9D9" d="M.75 0h40v40h-40z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M11.472 26.917c1.548 0 3.046.182 4.494.548 1.449.366 2.886.952 4.312 1.757v-16.61a13.18 13.18 0 00-4.17-2.147 15.587 15.587 0 00-4.636-.715c-1.018 0-1.868.053-2.548.16-.68.106-1.489.312-2.424.618-.333.11-.57.27-.708.479a1.213 1.213 0 00-.209.688V26.61c0 .37.14.646.417.826.278.181.583.211.917.09.481-.184 1.106-.333 1.875-.444a18.96 18.96 0 012.68-.166zm9.806 2.305c1.407-.805 2.829-1.391 4.264-1.757a18.094 18.094 0 014.486-.548c1.018 0 1.916.055 2.694.166.778.111 1.398.241 1.861.39.334.138.64.117.917-.063.278-.18.417-.466.417-.855v-14.86c0-.25-.07-.473-.209-.667-.139-.195-.375-.361-.708-.5-.917-.306-1.718-.512-2.405-.618-.686-.107-1.542-.16-2.567-.16-1.556 0-3.097.238-4.625.715a12.88 12.88 0 00-4.125 2.146v16.611zm-.5 1.111c-.177 0-.344-.023-.5-.07a2.614 2.614 0 01-.43-.166 18.106 18.106 0 00-4.045-1.618 16.768 16.768 0 00-4.33-.562c-.733 0-1.458.044-2.175.132-.717.088-1.437.238-2.16.451-.63.24-1.214.15-1.75-.27-.537-.422-.805-.99-.805-1.702v-14.75c0-.463.123-.891.368-1.285a1.955 1.955 0 011.021-.826c.87-.324 1.77-.558 2.699-.702a18.314 18.314 0 012.801-.215c1.676 0 3.301.248 4.875.743 1.574.495 3.051 1.22 4.43 2.174a16.054 16.054 0 019.25-2.917c.933 0 1.866.072 2.797.215.932.144 1.833.378 2.704.702.435.157.775.433 1.02.826.246.394.369.822.369 1.285v14.75c0 .71-.301 1.264-.903 1.658-.602.395-1.236.471-1.903.23a12.997 12.997 0 00-2.041-.388 18.973 18.973 0 00-2.042-.111c-1.477 0-2.916.187-4.316.562-1.4.375-2.744.915-4.032 1.618a2.61 2.61 0 01-.43.167c-.157.046-.314.07-.472.07zM23.833 15c0-.056.02-.12.057-.19a.343.343 0 01.18-.157 11.901 11.901 0 012.78-.986 14.02 14.02 0 013.074-.334c.539 0 1.038.028 1.498.084.46.055.948.139 1.467.25a.604.604 0 01.25.15.376.376 0 01.111.281c0 .194-.053.33-.16.409-.106.079-.252.1-.437.063a12.249 12.249 0 00-1.324-.181 17.24 17.24 0 00-1.412-.056c-.963 0-1.905.09-2.827.271a12.41 12.41 0 00-2.59.799c-.185.083-.343.088-.472.014-.13-.074-.195-.213-.195-.417zm0 9c0-.061.02-.132.057-.213a.342.342 0 01.18-.176c.805-.435 1.732-.757 2.78-.965a15.746 15.746 0 013.074-.313c.539 0 1.038.028 1.498.084.46.055.948.139 1.467.25a.604.604 0 01.25.15.376.376 0 01.111.281c0 .194-.053.33-.16.409-.106.079-.252.1-.437.063a12.249 12.249 0 00-1.324-.181 17.24 17.24 0 00-1.412-.056c-.936 0-1.857.102-2.764.306-.908.204-1.764.486-2.57.847-.203.111-.38.116-.527.014-.149-.102-.223-.268-.223-.5zm0-4.458c0-.056.02-.12.057-.19a.343.343 0 01.18-.157 11.906 11.906 0 012.78-.987 14.026 14.026 0 013.074-.333c.539 0 1.038.028 1.498.083.46.056.948.14 1.467.25a.605.605 0 01.25.15.375.375 0 01.111.282c0 .194-.053.33-.16.409-.106.078-.252.1-.437.062a12.299 12.299 0 00-1.324-.18c-.45-.038-.922-.056-1.412-.056-.963 0-1.905.09-2.827.27-.921.181-1.784.448-2.59.8-.185.083-.343.087-.472.013-.13-.074-.195-.213-.195-.416z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}

function ClickedTestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none" {...props}>
      <mask
        id="a"
        width={41}
        height={40}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <path fill="#D9D9D9" d="M.75 0h40v40h-40z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#0D0E10"
          d="M21.278 29.222q2.111-1.208 4.264-1.757a18 18 0 0 1 4.486-.548q1.527 0 2.694.166 1.167.167 1.861.39.501.207.917-.063t.417-.855v-14.86q0-.376-.209-.667t-.708-.5q-1.375-.459-2.41-.618-1.035-.16-2.562-.16-2.334 0-4.625.715a12.9 12.9 0 0 0-4.125 2.146zm-.5 1.111q-.277 0-.507-.07a3 3 0 0 1-.424-.166A18 18 0 0 0 15.8 28.48a16.8 16.8 0 0 0-4.327-.562q-1.11 0-2.18.132-1.069.132-2.153.451-.945.36-1.75-.27-.806-.633-.806-1.702v-14.75q0-.694.368-1.285a1.96 1.96 0 0 1 1.021-.826q1.305-.486 2.702-.702 1.395-.215 2.798-.215 2.514 0 4.875.743a16.4 16.4 0 0 1 4.43 2.174 16.054 16.054 0 0 1 9.25-2.917q1.404 0 2.785.215 1.383.216 2.716.702.653.236 1.02.826.369.59.369 1.285v14.75q0 1.07-.903 1.66t-1.903.229a13 13 0 0 0-2.035-.39 19 19 0 0 0-2.048-.11q-2.208 0-4.313.562a18.2 18.2 0 0 0-4.035 1.618q-.194.097-.423.167t-.48.07M23.833 15q0-.098.056-.194a.37.37 0 0 1 .18-.153q1.293-.653 2.785-.986a14 14 0 0 1 3.063-.334q.819 0 1.507.084.687.083 1.465.25a.6.6 0 0 1 .25.152.4.4 0 0 1 .111.292q0 .277-.16.396t-.437.063a13 13 0 0 0-1.327-.181q-.673-.056-1.41-.056-1.443 0-2.826.271a12.4 12.4 0 0 0-2.59.799q-.278.125-.472.014-.195-.111-.195-.417m0 9q0-.098.056-.215a.35.35 0 0 1 .18-.174q1.209-.653 2.785-.965a15.7 15.7 0 0 1 3.063-.313q.819 0 1.507.084.687.083 1.465.25a.6.6 0 0 1 .25.152.4.4 0 0 1 .111.292q0 .277-.16.396t-.437.063a13 13 0 0 0-1.327-.181q-.673-.056-1.41-.056-1.402 0-2.763.306t-2.57.847q-.305.167-.527.014-.223-.152-.223-.5m0-4.458q0-.097.056-.195a.37.37 0 0 1 .18-.152q1.293-.653 2.785-.987a14 14 0 0 1 3.063-.333q.819 0 1.507.083.687.084 1.465.25a.6.6 0 0 1 .25.153.4.4 0 0 1 .111.292q0 .277-.16.396-.16.118-.437.062a13 13 0 0 0-1.327-.18q-.673-.056-1.41-.056-1.443 0-2.826.27-1.381.272-2.59.8-.278.124-.472.013-.195-.111-.195-.416"
        />
      </g>
    </svg>
  );
}

function CommunityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={41} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={40}>
        <path fill="#D9D9D9" d="M.5 0h40v40H.5z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M10 32.833c-.627 0-1.173-.232-1.637-.696-.464-.464-.696-1.01-.696-1.637v-21c0-.627.232-1.173.696-1.637.464-.464 1.01-.696 1.637-.696h8.389c-.343-.787-.287-1.54.166-2.257.454-.718 1.11-1.077 1.966-1.077.856 0 1.511.36 1.965 1.077.454.717.495 1.47.125 2.257H31c.627 0 1.173.232 1.637.696.464.464.696 1.01.696 1.637v21c0 .627-.232 1.173-.696 1.637-.464.464-1.01.696-1.637.696H10zm0-1h21c.333 0 .639-.138.917-.416.277-.278.416-.584.416-.917v-21c0-.333-.139-.639-.416-.917-.278-.277-.584-.416-.917-.416H10c-.333 0-.639.139-.917.416-.277.278-.416.584-.416.917v21c0 .333.139.639.416.917.278.277.584.416.917.416zm3.75-5.083h8.445a.494.494 0 00.5-.507.472.472 0 00-.144-.354.493.493 0 00-.356-.139H13.75a.494.494 0 00-.5.507c0 .143.048.261.144.354a.492.492 0 00.356.139zm0-6.25h13.5a.494.494 0 00.5-.507.471.471 0 00-.144-.354.493.493 0 00-.356-.139h-13.5a.494.494 0 00-.5.507c0 .143.048.261.144.354a.492.492 0 00.356.139zm0-6.25h13.5a.494.494 0 00.5-.507.471.471 0 00-.144-.354.493.493 0 00-.356-.139h-13.5a.494.494 0 00-.5.507c0 .143.048.261.144.354a.492.492 0 00.356.139zm6.744-6.806c.357 0 .665-.122.924-.368a1.22 1.22 0 00.387-.923c0-.37-.129-.678-.387-.924a1.295 1.295 0 00-.924-.368c-.357 0-.658.123-.904.368a1.253 1.253 0 00-.368.924c0 .37.123.678.368.923.246.246.547.368.904.368z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}

function ClickedCommunityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} fill="none" {...props}>
      <mask
        id="a"
        width={41}
        height={41}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <path fill="#D9D9D9" d="M.146.5h40v40h-40z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#0D0E10"
          d="M9.646 33.333q-.942 0-1.637-.696-.697-.696-.697-1.637V10q0-.94.697-1.637.696-.696 1.637-.696h8.389q-.514-1.181.166-2.257.681-1.077 1.966-1.077t1.965 1.077q.68 1.076.125 2.257h8.389q.94 0 1.637.696.696.696.696 1.637v21q0 .94-.696 1.637-.696.696-1.637.696zm3.75-6.083h8.444a.494.494 0 0 0 .5-.507.47.47 0 0 0-.144-.354.5.5 0 0 0-.356-.14h-8.444a.494.494 0 0 0-.5.507q0 .216.144.355a.5.5 0 0 0 .356.139m0-6.25h13.5a.494.494 0 0 0 .5-.507.47.47 0 0 0-.144-.354.5.5 0 0 0-.356-.14h-13.5a.494.494 0 0 0-.5.507q0 .216.144.355a.5.5 0 0 0 .356.139m0-6.25h13.5a.494.494 0 0 0 .5-.507.47.47 0 0 0-.144-.354.5.5 0 0 0-.356-.14h-13.5a.494.494 0 0 0-.5.507q0 .216.144.355a.5.5 0 0 0 .356.139m6.744-6.806q.535 0 .924-.368a1.22 1.22 0 0 0 .387-.923q0-.556-.387-.924a1.3 1.3 0 0 0-.924-.368q-.536 0-.904.368a1.25 1.25 0 0 0-.368.924q0 .555.368.923t.904.368"
        />
      </g>
    </svg>
  );
}

function StopwatchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={41} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={40}>
        <path fill="#D9D9D9" d="M.25 0h40v40h-40z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M16.583 3.75a.494.494 0 01-.5-.507c0-.143.048-.262.144-.354a.493.493 0 01.356-.139h7.334a.494.494 0 01.5.507.472.472 0 01-.144.354.493.493 0 01-.356.139h-7.334zm3.674 18.639a.471.471 0 00.354-.144.493.493 0 00.139-.356v-7.25a.494.494 0 00-.507-.5.471.471 0 00-.354.144.493.493 0 00-.139.356v7.25a.494.494 0 00.507.5zM20.25 34.5a12.43 12.43 0 01-4.99-1.014 13.184 13.184 0 01-4.093-2.75 12.67 12.67 0 01-2.75-4.093c-.667-1.571-1-3.235-1-4.99 0-1.756.333-3.415 1-4.977a12.873 12.873 0 012.75-4.093 12.873 12.873 0 014.093-2.75 12.58 12.58 0 014.99-1c1.62 0 3.178.297 4.674.89a13.514 13.514 0 014.048 2.5l1.25-1.279a.546.546 0 01.34-.16c.135-.013.262.04.383.16.12.12.18.241.18.361s-.06.241-.18.362l-1.278 1.277a13.204 13.204 0 012.5 3.952c.61 1.486.916 3.076.916 4.77a12.61 12.61 0 01-1 4.977 12.668 12.668 0 01-2.75 4.093 13.183 13.183 0 01-4.093 2.75 12.43 12.43 0 01-4.99 1.014zm-.004-1c3.28 0 6.073-1.151 8.379-3.454 2.306-2.303 3.458-5.095 3.458-8.375 0-3.28-1.151-6.074-3.454-8.38-2.303-2.305-5.095-3.458-8.375-3.458-3.28 0-6.073 1.152-8.379 3.455-2.306 2.303-3.458 5.094-3.458 8.375 0 3.28 1.151 6.073 3.454 8.379 2.303 2.305 5.095 3.458 8.375 3.458z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}

function ClickedStopwatchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none" {...props}>
      <mask
        id="a"
        width={41}
        height={40}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <path fill="#D9D9D9" d="M.896 0h40v40h-40z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#0D0E10"
          d="M17.23 3.75a.494.494 0 0 1-.5-.507q0-.215.143-.354a.5.5 0 0 1 .356-.139h7.334a.494.494 0 0 1 .5.507.47.47 0 0 1-.144.354.5.5 0 0 1-.357.139zm3.673 18.639a.47.47 0 0 0 .354-.144.5.5 0 0 0 .139-.356v-7.25a.494.494 0 0 0-.507-.5.47.47 0 0 0-.354.144.5.5 0 0 0-.14.356v7.25q.001.212.146.356a.5.5 0 0 0 .362.144M20.896 34.5a12.4 12.4 0 0 1-4.99-1.014 13.2 13.2 0 0 1-4.094-2.75 12.7 12.7 0 0 1-2.75-4.093q-1-2.357-1-4.99t1-4.977a12.9 12.9 0 0 1 2.75-4.093 12.9 12.9 0 0 1 4.094-2.75q2.343-1 4.99-1 2.43 0 4.674.89a13.4 13.4 0 0 1 4.02 2.471l1.278-1.25a.55.55 0 0 1 .34-.16q.202-.02.382.16t.18.361q0 .18-.18.362l-1.277 1.277a13.2 13.2 0 0 1 2.5 3.952q.915 2.229.916 4.77 0 2.62-1 4.977a12.7 12.7 0 0 1-2.75 4.093 13.2 13.2 0 0 1-4.093 2.75 12.4 12.4 0 0 1-4.99 1.014"
        />
      </g>
    </svg>
  );
}

function MypageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={40}
        height={40}>
        <path fill="#D9D9D9" d="M0 0h40v40H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M20 18.667c-1.238 0-2.283-.427-3.137-1.28-.853-.854-1.28-1.904-1.28-3.15 0-1.248.427-2.293 1.28-3.137.854-.845 1.9-1.267 3.137-1.267 1.238 0 2.283.422 3.137 1.267.853.844 1.28 1.89 1.28 3.136 0 1.247-.427 2.297-1.28 3.15-.854.854-1.9 1.28-3.137 1.28zM8.833 30.333v-2.027c0-.63.192-1.211.577-1.744a3.956 3.956 0 011.534-1.256 26.1 26.1 0 014.604-1.598 19.02 19.02 0 014.451-.541c1.464 0 2.948.18 4.452.541 1.505.362 3.035.898 4.59 1.609.652.3 1.169.716 1.552 1.247.382.531.574 1.112.574 1.742v2.027H8.833zm1-1h20.334v-1.027c0-.408-.142-.799-.424-1.174-.282-.375-.678-.697-1.188-.965a19.79 19.79 0 00-4.223-1.507A19.233 19.233 0 0020 24.167a19.158 19.158 0 00-8.556 2c-.509.268-.905.59-1.187.965-.282.375-.424.766-.424 1.174v1.027zM20 17.667c.954 0 1.762-.331 2.424-.993.662-.662.993-1.47.993-2.424s-.331-1.762-.993-2.424c-.662-.662-1.47-.993-2.424-.993s-1.762.331-2.424.993c-.662.662-.993 1.47-.993 2.424s.331 1.762.993 2.424c.662.662 1.47.993 2.424.993z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}
function ClickedMypageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
      <mask
        id="a"
        width={40}
        height={40}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <path fill="#D9D9D9" d="M0 0h40v40H0z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#0D0E10"
          d="M20 18.666q-1.857 0-3.136-1.28t-1.28-3.136q0-1.884 1.28-3.15T20 9.832t3.137 1.266q1.28 1.268 1.28 3.15 0 1.857-1.28 3.137T20 18.666M8.833 30.333v-2.028q0-.944.577-1.743a3.96 3.96 0 0 1 1.534-1.257 26 26 0 0 1 4.605-1.597A19 19 0 0 1 20 23.166q2.195 0 4.451.542 2.258.542 4.605 1.597.958.459 1.534 1.257.577.8.577 1.743v2.028z"
        />
      </g>
    </svg>
  );
}
