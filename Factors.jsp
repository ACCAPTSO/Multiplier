<%-- 
    Document   : Factors
    Created on : Nov 19, 2017, 12:08:40 PM
    Author     : frieda
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>FACTORS</title>
        <link rel="stylesheet" href="Factors.css" type="text/css">
        <script src="Factors.js"></script>
    </head>
    <body>
        <% 
        int remnder;
        final int MAXBOXES = 500;
        final int UNCLASSED = 0;
        final int NQUES = 17;
        final double MAXOPRND = 99999.;
        final int BLUE = 0;
        final int RED = 1;
        final int GREEN = 2;
        final int WHITE = 3;
        final int CYAN = 4;
        final int MAGENTA = 5;
        final int YELLOW = 6;
        
        int[] boxCntents;
        int[] rclass;
        int[] gclass;
        int[] bclass;
        boolean[] moveable;
        boolean[] thisBoxDragged;
        boolean[] thisBoxCor;
        boolean[] isRemnder;
        boolean[] isprod;
        boolean[] islast;
        boolean[] placed;
        boolean[] firstmoved;
        boolean[] lightbackground;
        boolean [] alreadyasked;

        String textString[] = new String[MAXBOXES];
        boxCntents = new int[MAXBOXES];
        rclass = new int[MAXBOXES];
        gclass = new int[MAXBOXES];
        bclass = new int[MAXBOXES];
        moveable = new boolean[MAXBOXES];
        thisBoxDragged = new boolean[MAXBOXES];
        thisBoxCor = new boolean[MAXBOXES];
        isRemnder = new boolean[MAXBOXES];
        isprod = new boolean[MAXBOXES];
        islast = new boolean[MAXBOXES];
        placed = new boolean[MAXBOXES];
        firstmoved = new boolean[MAXBOXES];
        lightbackground = new boolean[MAXBOXES];
        alreadyasked = new boolean[NQUES];

        int[] redPos = { 734, 60 };    // y positions are written over
        int[] whitePos = { 690, 370 };
        int[] cyanPos = { 680, 570 };
        int[] bluePos = { 520, 500 };
        int[] magentaPos = { 530, 285 };
        int[] yellowPos = { 940, 300 };
        int[] greenPos = { 980, 440 };
        boolean allDone = false;
        boolean trudown = false;
        String instruction1;
        String instruction2;
        int num2s;
        int num3s;
        int num5s;
        int num7s;
        int num11s;
        int inc;
        double possbl;
        int blueOp;
        int redOp;
        int greenOp;
        int jdx = 0;
        int mdx = 0;
        int mdxprev = 0;
        int mdx2prev = 0;
        int indcatr = 0;
        int indcatrprev = 0;
        int indcatr2prev = 0;
        int count2manybig = 0;
        int numshared = 0; 
        int whichshared = 0;
        int squarefact = 0;
        int countequal = 0;
        int count2big = 0;
        int count2small = 0;
        int count2mnyboxes = 0;
        int count2many5s = 0;
        
        for( int idx = 0; idx < MAXBOXES; idx++ ) {
            textString[idx] = "";
            boxCntents[idx] = 0;
            rclass[idx] = UNCLASSED;
            gclass[idx] = UNCLASSED;
            bclass[idx] = UNCLASSED;
            moveable[idx] = false;
            thisBoxDragged[idx] = false;
            thisBoxCor[idx] = true;
            isRemnder[idx] = false;
            isprod[idx] = false;
            islast[idx] = false;
            placed[idx] = false;
            firstmoved[idx] = true;
            lightbackground[idx] = true;
        }

        for( int idx = 0; idx < NQUES; idx++ ) {
           alreadyasked[idx] = false;
        }

        redPos[1] = 60;
        whitePos[1] = 370;
        cyanPos[1] = 570;
        bluePos[1] = 500;
        magentaPos[1] = 285;
        yellowPos[1] = 300;
        greenPos[1] = 440;
        allDone = false;
        trudown = false;
        instruction2 = "";

        /* generate 7? prime factors, not necessarily unique, more           */
        /* probability * of the smaller ones. generate a 3 bit number to     */
        /* determine which of the three operands it goes in.                 */

        num2s = 5;
        num3s = 2;
        num5s = 2;
        num7s = 1;
        num11s = 3;
        num11s = 1;
        num3s = 1;
        num5s = 1;
        num2s = 1;
        inc = 30;
        possbl = (double)( num2s + num3s + num5s + num7s + num11s + 20*inc );
        blueOp = 0;
        redOp = 0;
        greenOp = 0;
        int ldx = 0;
        int howmanybig = 0;
        int howmany2s = 0;
        int howmany5s = 0;
        int[] thisOp;
        thisOp = new int[4];
        int numcats = 50;
        int[] numoccurs;
        int[] boccurs; // how many of each factor under the first operand
        int[] roccurs;
        int[] goccurs;
        int[] numblues;
        int[] numreds;
        int[] numgreens;
        int[] nummagentas;
        int[] numyellows;
        int[] numcyans;
        int[] numwhites;
        numoccurs = new int[MAXBOXES];
        goccurs = new int[MAXBOXES];
        roccurs = new int[MAXBOXES];
        boccurs = new int[MAXBOXES];
        numblues = new int[MAXBOXES];
        numreds = new int[MAXBOXES];
        numgreens = new int[MAXBOXES];
        nummagentas = new int[MAXBOXES];
        numyellows = new int[MAXBOXES];
        numcyans = new int[MAXBOXES];
        numwhites = new int[MAXBOXES];
  
        int count2s = 0;
        int thisfact = 0;
        int count3s = 0;
        int count5s = 0;
        int count7s = 0;
        int count11s = 0;
        int count13s = 0;
        int count17s = 0;
        int count19s = 0;
        int count23s = 0;
        int count29s = 0;
        int count31s = 0;
        int count37s = 0;
        int count41s = 0;
        int count43s = 0;
        int count47s = 0;
        int count53s = 0;
        int count59s = 0;
        int count61s = 0;
        int count67s = 0;
        int count71s = 0;
        int count73s = 0;
        int count79s = 0;
        int count83s = 0;
        int count89s = 0;
        int count97s = 0;
        int[] cat = new int[MAXBOXES];
        int [] whichops = { 1, 2, 4, 3, 5, 6, 7, 7, 7 };


 // throw out any sets of 3 operands where any 2 operands are
         // equal, any operand is too big, there are too many big
         // prime factors or more prime factors of 5's than 2's
         while( blueOp == redOp | blueOp == greenOp | redOp == greenOp |
                blueOp > MAXOPRND | redOp > MAXOPRND | greenOp > MAXOPRND |
                blueOp < 2 | redOp < 2 | greenOp < 2 |
                ldx > MAXBOXES | howmany5s > howmany2s | howmanybig > 1 ) {
            // how many distinct factors = numcats
            // how many of each factor in each operand = boccurs, roccurs...
            // how many of each factor total = numoccurs
            // how many copies of a given factor in each section = numyellows..
            // clear out any previous ones
            thisOp[BLUE] = 0;
            thisOp[RED] = 0;
            thisOp[GREEN] = 0;
            howmany2s = 0;
            howmany5s = 0;
            howmanybig = 0;
            for( int idx = 0; idx < numcats; idx++ ) {
               numoccurs[idx] = 0;
               boccurs[idx] = 0;
               roccurs[idx] = 0;
               goccurs[idx] = 0;
               numblues[idx] = 0;
               nummagentas[idx] = 0;
               numreds[idx] = 0;
               numyellows[idx] = 0;
               numgreens[idx] = 0;
               numcyans[idx] = 0;
               numwhites[idx] = 0;
            }
            numcats = 0;
//            for( idx = 0; idx < 2; idx++ ) {
            for( int idx = 0; idx < 4; idx++ ) {
               while( ( mdx == mdxprev & indcatr == indcatrprev ) |
                     ( mdx == mdx2prev & indcatr == indcatr2prev ) ) {
                  if( howmanybig > 0 ) {
                     count2manybig++;
                     possbl = num2s+num3s+num5s+num7s+num11s;
                  }
                  indcatr = (int)(StrictMath.random()*possbl);
                  // the bigger the factor, the more chances it
                  // is shared
                  numshared = (int)( 3.0*StrictMath.random() );
                  whichshared = (int)( StrictMath.random()*3. );
                  mdx = 3*numshared+whichshared;
                  squarefact = 1 + ( int )( 1.6*StrictMath.random() );
//                  squarefact = 1;
               }
               mdx2prev = mdxprev;
               mdxprev = mdx;
               indcatr2prev = indcatrprev;
               indcatrprev = indcatr;
//               System.out.println("numshared");
//               System.out.println(numshared);
//               System.out.println("indcatr");
//               System.out.println(indcatr);
               if( indcatr < num2s ) {
                  thisfact = 2;
                  howmany2s += squarefact;
                  count2s += squarefact;
               } else if( indcatr < num2s+num3s ) {
                  thisfact = 3;
                  count3s += squarefact;
               } else if( indcatr < num2s+num3s+num5s ) {
                  thisfact = 5;
                  howmany5s += squarefact;
                  count5s += squarefact;
               } else if( indcatr < num2s+num3s+num5s+num7s ) {
                  thisfact = 7;
                  count7s += squarefact;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s ) {
                  thisfact = 11;
                  count11s += squarefact;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + inc ) {
                  thisfact = 13;
                  howmanybig += 1;
                  count13s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 2*inc ) {
                  thisfact = 17;
                  howmanybig += 1;
                  count17s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 3*inc ) {
                  thisfact = 19;
                  howmanybig += 1;
                  count19s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 4*inc ) {
                  thisfact = 23;
                  howmanybig += 1;
                  count23s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 5*inc ) {
                  thisfact = 29;
                  howmanybig += 1;
                  count29s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 6*inc ) {
                  thisfact = 31;
                  howmanybig += 1;
                  count31s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 7*inc ) {
                  thisfact = 37;
                  howmanybig += 1;
                  count37s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 8*inc ) {
                  thisfact = 41;
                  howmanybig += 1;
                  count41s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 9*inc ) {
                  thisfact = 43;
                  howmanybig += 1;
                  count43s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 10*inc ) {
                  thisfact = 47;
                  howmanybig += 1;
                  count47s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 11*inc ) {
                  thisfact = 53;
                  howmanybig += 1;
                  count53s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 12*inc ) {
                  thisfact = 59;
                  howmanybig += 1;
                  count59s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 13*inc ) {
                  thisfact = 61;
                  howmanybig += 1;
                  count61s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 14*inc ) {
                  thisfact = 67;
                  howmanybig += 1;
                  count67s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 15*inc ) {
                  thisfact = 71;
                  howmanybig += 1;
                  count71s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 16*inc ) {
                  thisfact = 73;
                  howmanybig += 1;
                  count73s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 17*inc ) {
                  thisfact = 79;
                  howmanybig += 1;
                  count79s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 18*inc ) {
                  thisfact = 83;
                  howmanybig += 1;
                  count83s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 19*inc ) {
                  thisfact = 89;
                  howmanybig += 1;
                  count89s += 1;
                  squarefact = 1;
               } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 20*inc ) {
                  thisfact = 97;
                  howmanybig += 1;
                  count97s += 1;
                  squarefact = 1;
               }
//               System.out.println("thisfact");
//               System.out.println(thisfact);
               for( jdx = 0; jdx < numcats; jdx++ ) { 
                  if( thisfact == cat[jdx] ) {
                     break;
                  }
               }
               if( jdx == numcats ) { // found a new category of prime factor
//                  System.out.println("new category");
                  cat[numcats] = thisfact;
                  numcats++;
               }
               if( ( whichops[mdx] & 1 ) > 0 ) {
                  boccurs[jdx] += squarefact;
                  numoccurs[jdx] += squarefact;
//                  System.out.println("boccurs");
//                  System.out.println(boccurs[jdx]);
               }
               if( ( whichops[mdx] & 2 ) > 0 ) {
                  roccurs[jdx] += squarefact;
                  numoccurs[jdx] += squarefact;
//                  System.out.println("roccurs");
//                  System.out.println(roccurs[jdx]);
               }
               if( ( whichops[mdx] & 4 ) > 0 ) {
                  goccurs[jdx] += squarefact;
                  numoccurs[jdx] += squarefact;
//                  System.out.println("goccurs");
//                  System.out.println(goccurs[jdx]);
               }
//               System.out.println("numoccurs");
//               System.out.println(numoccurs[jdx]);
            }
            ldx = 0;
            thisOp[BLUE] = ldx;
            blueOp = 1;
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < boccurs[idx]; jdx ++ ) {
                  blueOp *= cat[idx];
                  ldx += 2;
               }
            }
            System.out.println("blue operand");
            System.out.println( blueOp );
            ldx += 1;
            thisOp[RED] = ldx;
            redOp = 1;
            System.out.println("red box index");
            System.out.println(ldx);
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < roccurs[idx]; jdx ++ ) {
                  redOp *= cat[idx];
                  ldx += 2;
               }
            }
            System.out.println("red operand");
            System.out.println( redOp);
            ldx += 1;
            thisOp[GREEN] = ldx;
            greenOp = 1;
            System.out.println("green box index");
            System.out.println(ldx);
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < goccurs[idx]; jdx ++ ) {
                  greenOp *= cat[idx];
                  ldx += 2;
               }
            }
            System.out.println("green operand");
            System.out.println( greenOp );
            if( blueOp == redOp | blueOp == greenOp | redOp == greenOp ) {
               countequal++;
            }
            if( blueOp > MAXOPRND | redOp > MAXOPRND | greenOp > MAXOPRND ) {
               count2big++;
            }
            if( blueOp < 2 | redOp < 2 | greenOp < 2 ) {
               count2small++;
            }
            if( ldx > MAXBOXES ) {
               count2mnyboxes++;
            }
            if( howmany5s > howmany2s ) {
               count2many5s++;
            }
        }

%>
    <table>
        <th id="instr" colspan="9">What is a prime number that evenly divides <%=blueOp%>? (Enter)</th>
<%      for( int row = 0; row < 9; ++row ) { %>
            <tr>
<%          for( int col = 0; col < 9; ++col ) { 
                boolean isFirstOp = ( row == 0 && col == 1 );
                boolean isSecondOp = ( row == 0 && col == 4 );
                boolean isThirdOp = ( row == 0 && col == 7 );
                boolean isFirstIn = ( row == 0 && col == 0 );
                String whatType = isFirstOp || isFirstIn? "text" : "hidden";
                String whatValue = isFirstOp? String.valueOf(blueOp) : 
                                   isSecondOp? String.valueOf(redOp) :
                                   isThirdOp? String.valueOf(greenOp) : ""; 
                String whatId = row + "_" + col; %>
<%              if( (col+1)%3 == 0 ) { %>
                    <td class="blank"><div></div></td>
<%              } else if( isFirstOp ) { %>
                    <td id="firstOp" class="op">
                    <input type="<%=whatType%>" 
                           value="<%=whatValue%>" 
                           id="<%=whatId%>">
                    </input>
                    </td>
<%              } else { %>
                    <td class="op">
                    <input type="<%=whatType%>" 
                           value="<%=whatValue%>" 
                           id="<%=whatId%>"
                           onkeyup="check( event )"
                           onkeydown="erase( event )">
                    </input>
                    </td>
<%              }                
            } %>
            </tr>
            
<%      } %>

    </table>
    </body>
</html>
