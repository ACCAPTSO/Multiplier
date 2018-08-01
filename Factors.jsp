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
        <script src="drag3d.js"></script>
    </head>
    <body id="thisbody">
        <% 
            // this needs some serious commenting so I know how to modify distribution fixit
        final int MAXBOXES = 5000; // one too many 0s fixit
        final int UNCLASSED = 0;

        final double MAXOPRND = 999999.; // one too many 9s fixit
        final int BLUE = 0;
        final int RED = 1;
        final int GREEN = 2;
        final boolean debug = false;
        String itype = debug? "text" : "hidden";
        
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


        int[] redPos = { 734, 60 };    // y positions are written over
        int[] whitePos = { 690, 370 };
        int[] cyanPos = { 680, 570 };
        int[] bluePos = { 520, 500 };
        int[] magentaPos = { 530, 285 };
        int[] yellowPos = { 940, 300 };
        int[] greenPos = { 980, 440 };
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
        int numshared = 0; 
        int whichshared = 0;
        int squarefact = 0;
        
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

        redPos[1] = 60;
        whitePos[1] = 370;
        cyanPos[1] = 570;
        bluePos[1] = 500;
        magentaPos[1] = 285;
        yellowPos[1] = 300;
        greenPos[1] = 440;

        /* generate 7? prime factors, not necessarily unique, more           */
        /* probability * of the smaller ones. generate a 3 bit number to     */
        /* determine which of the three operands it goes in.                 */

        num2s = 50;
        num3s = 50;
        num5s = 15;
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
        int ldx = 0; // how many boxes are used so you don't write outside array
        int howmanybig = 0;
        int howmany2s = 0;
        int howmany5s = 0;
        //int[] thisOp;
        //thisOp = new int[4];
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
  
        int thisfact = 0;

        int[] cat = new int[MAXBOXES];
        //                 blue, red, green, magenta, yellow, cyan,  white, white, white
        //int [] whichops = { 1,   2,     4,       3,      6,    5,     7,     7,     7 };
        int [] whichops = { 1, 1, 2, 2, 4, 4, 3, 5, 3, 6, 5, 6, 7, 7, 7, 7, 7, 7 };
        //int [] whichops = { 6, 6, 6, 6, 6, 6, 6, 6, 6 };
        int bluefacts = 0;
        int redfacts = 0;
        int greenfacts = 0;

        // throw out any sets of 3 operands where any 2 operands are
        // equal, any operand is too big, there are too many big
        // prime factors or more prime factors of 5's than 2's
        while( blueOp == redOp | blueOp == greenOp | redOp == greenOp |
                blueOp > MAXOPRND | redOp > MAXOPRND | greenOp > MAXOPRND |
               blueOp < 2 | redOp < 2 | greenOp < 2 |
               ldx > MAXBOXES | howmanybig > 1 | howmany5s > howmany2s ) { // fixit
            
            // how many actual distinct factors = numcats
            // how many of each factor in each operand = boccurs, roccurs...
            // how many of each factor total = numoccurs
            // how many copies of a given factor in each section = numyellows..
            // clear out any previous ones
            //thisOp[BLUE] = 0;
            //thisOp[RED] = 0;
            //thisOp[GREEN] = 0;
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

            int nDistinctFactors = 5; // possible distinct factors
            for( int idx = 0; idx < nDistinctFactors; idx++ ) {
                while( ( mdx == mdxprev & indcatr == indcatrprev ) |
                     ( mdx == mdx2prev & indcatr == indcatr2prev ) ) {
                    if( howmanybig > 0 ) {
                        possbl = num2s+num3s+num5s+num7s+num11s; // fixit
                    }
                    indcatr = (int)(StrictMath.random()*possbl);
                    // the bigger the factor, the more chances it
                    // is shared .. not true, should it be? fixit

		    // numshared = 0 single color, blue, red or green
		    // possible to have shared factors, but only by coincidence
		    // because same factor was generated twice
		    // numshared = 1 magenta, yellow or cyan
		    // numshared = 2 white
                    numshared = (int)( 3.0*StrictMath.random() );
		    // whichshared = 0, 1: blue; 2, 3: red; 4, 5: green 
                    whichshared = (int)( StrictMath.random()*6. );
                    //whichshared = 4+(int)( StrictMath.random()*2);
                    mdx = 6*numshared+whichshared;
                    squarefact = 1 + ( int )( 1.6*StrictMath.random() );
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
                } else if( indcatr < num2s+num3s ) {
                   thisfact = 3;
                } else if( indcatr < num2s+num3s+num5s ) {
                   thisfact = 5;
                   howmany5s += squarefact;
                } else if( indcatr < num2s+num3s+num5s+num7s ) {
                   thisfact = 7;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s ) {
                   thisfact = 11;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + inc ) {
                   thisfact = 13;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 2*inc ) {
                   thisfact = 17;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 3*inc ) {
                   thisfact = 19;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 4*inc ) {
                   thisfact = 23;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 5*inc ) {
                   thisfact = 29;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 6*inc ) {
                   thisfact = 31;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 7*inc ) {
                   thisfact = 37;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 8*inc ) {
                   thisfact = 41;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 9*inc ) {
                   thisfact = 43;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 10*inc ) {
                   thisfact = 47;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 11*inc ) {
                   thisfact = 53;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 12*inc ) {
                   thisfact = 59;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 13*inc ) {
                   thisfact = 61;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 14*inc ) {
                   thisfact = 67;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 15*inc ) {
                   thisfact = 71;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 16*inc ) {
                   thisfact = 73;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 17*inc ) {
                   thisfact = 79;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 18*inc ) {
                   thisfact = 83;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 19*inc ) {
                   thisfact = 89;
                   howmanybig += 1;
                   squarefact = 1;
                } else if( indcatr < num2s+num3s+num5s+num7s+num11s + 20*inc ) {
                   thisfact = 97;
                   howmanybig += 1;
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
            //thisOp[BLUE] = ldx;
            blueOp = 1;
            bluefacts = 0;
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < boccurs[idx]; jdx ++ ) {
                  blueOp *= cat[idx];
                  ldx += 2;
               }
               bluefacts += boccurs[idx];
            }
            //System.out.println("blue operand");
            //System.out.println( blueOp );
            ldx += 1;
            //thisOp[RED] = ldx;
            redOp = 1;
            //System.out.println("red box index");
            //System.out.println(ldx);
            redfacts = 0;
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < roccurs[idx]; jdx ++ ) {
                  redOp *= cat[idx];
                  ldx += 2;
               }
               redfacts += roccurs[idx];
            }
            //System.out.println("red operand");
            //System.out.println( redOp);
            ldx += 1;
            //thisOp[GREEN] = ldx;
            greenOp = 1;
            //System.out.println("green box index");
            //System.out.println(ldx);
            greenfacts = 0;
            for( int idx = 0; idx < numcats; idx++ ) {
               for( jdx = 0; jdx < goccurs[idx]; jdx ++ ) {
                  greenOp *= cat[idx];
                  ldx += 2;
               }
               greenfacts += goccurs[idx];
            }
            //System.out.println("green operand");
            //System.out.println( greenOp );
        }
        // count how many of each prime factor in each final color category
        // = numblues, numwhites, numyellows etc.
        for( int idx = 0; idx < numcats; idx++ ) {
            if( boccurs[idx] == numoccurs[idx] ) {
                numblues[idx] = boccurs[idx];
            } else if( roccurs == numoccurs ) {
                numreds[idx] = roccurs[idx];
            } else if( goccurs == numoccurs ) {
                numgreens[idx] = goccurs[idx];
            } else { 
                numwhites[idx] = StrictMath.min( boccurs[idx],
                    StrictMath.min( roccurs[idx], goccurs[idx] ) );
                // which has the least?
                if( boccurs[idx] == numwhites[idx] ) {
                    if( roccurs[idx] > goccurs[idx] ) { // any goccurs are going
                                                        // to be white or yellow
                                                        // there is no green and no cyan
                        numreds[idx]=roccurs[idx]-goccurs[idx];
                        numyellows[idx]=roccurs[idx]-numreds[idx]-numwhites[idx];
                        numgreens[idx] = 0;
                    } else {
                        numgreens[idx]=goccurs[idx]-roccurs[idx];
                        numyellows[idx]=goccurs[idx]-numgreens[idx]-numwhites[idx];
                        numreds[idx] = 0;
                    }
                } else if( roccurs[idx] == numwhites[idx] ) {
                    if( boccurs[idx] > goccurs[idx] ) {
                        numblues[idx]=boccurs[idx]-goccurs[idx];
                        numcyans[idx]=boccurs[idx]-numblues[idx]-numwhites[idx];
                        numgreens[idx] = 0; 
                    } else {
                        numgreens[idx]=goccurs[idx]-boccurs[idx];
                        numcyans[idx]=goccurs[idx]-numgreens[idx]-numwhites[idx];
                        numblues[idx] = 0;
                    }
                } else { // goccurs == numwhites
                    if( boccurs[idx] > roccurs[idx] ) {
                        numblues[idx]=boccurs[idx]-roccurs[idx];
                        nummagentas[idx]=boccurs[idx]-numblues[idx]-numwhites[idx];
                        numreds[idx] = 0; 
                     } else {
                        numreds[idx]=roccurs[idx]-boccurs[idx];
                        nummagentas[idx]=roccurs[idx]-numreds[idx]-numwhites[idx];
                        numblues[idx] = 0;
                     }
                }
            }
        }
        int whitefactor = 1;
        int magentafactor = 1;
        int redfactor = 1;
        int yellowfactor = 1;
        int greenfactor = 1;
        int cyanfactor = 1;
        int bluefactor = 1;
        int totwhites = 0;
        int totmagentas = 0;
        int totreds = 0; // total number of prime factors in red section
        int totyellows = 0;
        int totgreens = 0;
        int totcyans = 0;
        int totblues = 0;

        // if there is more than one prime factor in a colored section,
        // flag that (totmagentas, totblues etc. > 1 )
        // multiply them together to find that factor
        // (yellowfactor, cyanfactor etc.)
        for( int idx = 0; idx < numcats; idx++ ) {
            String catIdx = "c" + idx;
            for( jdx = 0; jdx < numwhites[idx]; jdx++ ) {
               whitefactor = whitefactor*cat[idx];
               totwhites += 1;
            } 
            String whiteIdx = "nWhite" + idx;
            String nWhiteIdx = String.valueOf(numwhites[idx]);
            for( jdx = 0; jdx < nummagentas[idx]; jdx++ ) {
               magentafactor = magentafactor*cat[idx];
               totmagentas += 1;
            } 
            String magentaIdx = "nMagenta" + idx;
            String nMagentaIdx = String.valueOf(nummagentas[idx]);
            for( jdx = 0; jdx < numreds[idx]; jdx++ ) {
               redfactor = redfactor*cat[idx];
               totreds += 1;
            }  
            String redIdx = "nRed" + idx;
            String nRedIdx = String.valueOf(numreds[idx]);
            String roccursIdx = "roccurs" + idx;
            for( jdx = 0; jdx < numyellows[idx]; jdx++ ) {
               yellowfactor = yellowfactor*cat[idx];
               totyellows += 1;
            } 
            String yellowIdx = "nYellow" + idx;
            String nYellowIdx = String.valueOf(numyellows[idx]);
            for( jdx = 0; jdx < numgreens[idx]; jdx++ ) {
               greenfactor = greenfactor*cat[idx];
               totgreens += 1;
            }  
            String greenIdx = "nGreen" + idx;
            String nGreenIdx = String.valueOf(numgreens[idx]);
            String goccursIdx = "goccurs" + idx;
            for( jdx = 0; jdx < numcyans[idx]; jdx++ ) {
               cyanfactor = cyanfactor*cat[idx];
               totcyans += 1;
            }   
            String cyanIdx = "nCyan" + idx;
            String nCyanIdx = String.valueOf(numcyans[idx]);
            for( jdx = 0; jdx < numblues[idx]; jdx++ ) {
               bluefactor = bluefactor*cat[idx];
               totblues += 1;
            } 
            String blueIdx = "nBlue" + idx;
            String nBlueIdx = String.valueOf(numblues[idx]); 
            String boccursIdx = "boccurs" + idx; 

        
             %>    
            <input type="<%=itype%>" id="<%=catIdx%>" value="<%=cat[idx]%>" class="cat">
            <input type="<%=itype%>" id="<%=whiteIdx%>" value ="<%=nWhiteIdx%>" >
            <input type="<%=itype%>" id="<%=magentaIdx%>" value ="<%=nMagentaIdx%>" >
            <input type="<%=itype%>" id="<%=redIdx%>" value ="<%=nRedIdx%>" >
            <input type="<%=itype%>" id="<%=yellowIdx%>" value ="<%=nYellowIdx%>" >
            <input type="<%=itype%>" id="<%=greenIdx%>" value ="<%=nGreenIdx%>" >
            <input type="<%=itype%>" id="<%=cyanIdx%>" value ="<%=nCyanIdx%>" >
            <input type="<%=itype%>" id="<%=blueIdx%>" value ="<%=nBlueIdx%>" >
            <input type="<%=itype%>" id="<%=roccursIdx%>" value="<%=roccurs[idx]%>">
            <input type="<%=itype%>" id="<%=goccursIdx%>" value="<%=goccurs[idx]%>">
            <input type="<%=itype%>" id="<%=boccursIdx%>" value="<%=boccurs[idx]%>">
            
<%      } 
    int maxrow = bluefacts > redfacts? bluefacts : redfacts;
    maxrow = maxrow > greenfacts? maxrow : greenfacts; 
    maxrow = maxrow + 1; %>
    <input type="<%=itype%>" id="totwhites" value="<%=totwhites%>">
    <input type="<%=itype%>" id="totmagentas" value="<%=totmagentas%>">
    <input type="<%=itype%>" id="totreds" value="<%=totreds%>">
    <input type="<%=itype%>" id="totyellows" value="<%=totyellows%>">
    <input type="<%=itype%>" id="totgreens" value="<%=totgreens%>">
    <input type="<%=itype%>" id="totcyans" value="<%=totcyans%>">
    <input type="<%=itype%>" id="totblues" value="<%=totblues%>">
    
    <input type="<%=itype%>" id="whitefactor" value="<%=whitefactor%>">
    <input type="<%=itype%>" id="magentafactor" value="<%=magentafactor%>">
    <input type="<%=itype%>" id="redfactor" value="<%=redfactor%>">
    <input type="<%=itype%>" id="yellowfactor" value="<%=yellowfactor%>">
    <input type="<%=itype%>" id="greenfactor" value="<%=greenfactor%>">
    <input type="<%=itype%>" id="cyanfactor" value="<%=cyanfactor%>">
    <input type="<%=itype%>" id="bluefactor" value="<%=bluefactor%>">

    <table id="ghosts">
        <tr>
        <th colspan="8" id="instr0" class="instrs">
        Maximize your browser window
        </th>
        </tr>
        <tr>
            <th colspan="8" id="instr1" class="instrs">What is a         
                <a href="/Tutorials/FindPrimes.jsp" class="ndx"> Prime </a>
                number that evenly divides <%=blueOp%>? (Enter)
        </th>
        </tr>
<%      for( int i = 2; i < 6; ++i ) {
            String whatId = "instr" + i; %>
            <tr><th colspan="8" id="<%=whatId%>" class="instrs">What</th></tr>
<%      }
for( int row = 0; row < maxrow; ++row ) { %>
            <tr>
<%          for( int col = 0; col < 8; ++col ) { 
                boolean isFirstOp = ( row == 0 && col == 1 );
                boolean isSecondOp = ( row == 0 && col == 4 );
                boolean isThirdOp = ( row == 0 && col == 7 );
                boolean isFirstIn = ( row == 0 && col == 0 );
                String whatType = isFirstOp || isFirstIn? "text" : "hidden";
                String whatValue = isFirstOp? String.valueOf(blueOp) : 
                                   isSecondOp? String.valueOf(redOp) :
                                   isThirdOp? String.valueOf(greenOp) : "";
                String whatId = "g" + row + "_" + col;
                if( (col+1)%3 == 0 ) { %>
                    <td class="blank"><div></div></td>
<%              } else if( isFirstOp ) { %>
                    <td id="firstGhost" class="op">
                    <input type="<%=whatType%>" 
                           value="<%=whatValue%>" 
                           id="<%=whatId%>"
                           class="ghost">
                    </input>
                    </td>
<%              } else { %>
                    <td class="op">
                    <input type="<%=whatType%>" 
                           value="<%=whatValue%>"
                           id="<%=whatId%>"
                           onkeyup="check( event )"
                           onkeydown="erase( event )"
                           class="ghost">
                    </input>
                    </td>
<%              }                
            } %>
            </tr>
            
<%      } %>

    </table>
    <div id="home">
        <a href="/" class="ndx">Home</a>
    </div>
    <div id="index">
        <a href="index.html" class="ndx">Back to Practice Index</a>
    </div>
    <div id="circles">   
        <label id="redLabel" class="section">red</label>
        <label id="redLabel2" class="section">red</label>
        <label id="magentaLabel" class="section">magenta</label>
        <label id="magentaLabel2" class="section">magenta</label>
        <label id="magentaLabel3" class="section">magenta</label>
        <label id="magentaLabel4" class="section">magenta</label>
        <label id="yellowLabel" class="section">yellow</label>
        <label id="yellowLabel2" class="section">yellow</label>
        <label id="yellowLabel3" class="section">yellow</label>
        <label id="yellowLabel4" class="section">yellow</label>
        <label id="whiteLabel" class="section">white</label>
        <label id="blueLabel" class="section">blue</label>
        <label id="cyanLabel" class="section">cyan</label>
        <label id="cyanLabel2" class="section">cyan</label>
        <label id="cyanLabel3" class="section">cyan</label>
        <label id="cyanLabel4" class="section">cyan</label>
        <label id="greenLabel" class="section">green</label>       
    </div>
    <div id="paperFrame">   
        <label id="finstr0"></label>       
        <label id="finstr1"></label>       
	<table id="fans">
	<tr>
		<td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
                <td class="nomargin"><input class="onewide"  disabled></input></td>
	</tr>
    </table>
    </div>
    <input type="<%=itype%>" id="linedUp" value="false" class="shortbox">
    <table id="statusTable">
<% for( int i = 0, j = 1; i < 0; i += 2, j += 2 ) {
    String whatId = "statusBox" + i; 
    String whatId2 = "statusBox" + j; %>
    <tr><td><%=i%></td><td><div id="<%=whatId%>"></div></td><td><%=j%></td><td><div id="<%=whatId2%>"></div></td></tr>
<% } %>
    </table>
    </body>
</html>
