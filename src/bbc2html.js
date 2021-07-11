let regs = [
  [/\[B\]/gi,      '<span class="bb-bold">'   ],
  [/\[\/B\]/gi,    '</span>'                  ],
  [/\[I\]/gi,      '<span class="bb-italic">' ],
  [/\[\/I\]/gi,    '</span>'                  ],
  [/\[U\]/gi,      '<span class="bb-under">'  ],
  [/\[\/U\]/gi,    '</span>'                  ],
  [/\[S\]/gi,      '<span class="bb-strike">' ],
  [/\[\/S\]/gi,    '</span>'                  ],
  [/\[code\]/gi,   '<pre >'                   ],
  [/\[\/code\]/gi, '</pre>'                   ],
  [/\[ul\]/gi,     '<ul >'                    ],
  [/\[\/ul\]/gi,   '</ul>'                    ],
  [/\[ol\]/gi,     '<ol >'                    ],
  [/\[\/ol\]/gi,   '</ol>'                    ],
  [/\[li\]/gi,     '<li >'                    ],
  [/\[\/li\]/gi,   '</li>'                    ],
]

function bbc2Html(str) {
  let res = "";  
  if (str) 
  {
     res = str;
     for(const re of regs) 
     {
      res = res.replace(re[0], re[1]);
     }
   }
  return res;
}
