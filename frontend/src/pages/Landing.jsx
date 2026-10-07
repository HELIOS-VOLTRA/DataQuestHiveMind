import "./Landing.css";


function Landing({ onEnter }) {

  return (

    <div className="landing">

      <header className="landing-nav">

        <div className="landing-brand">

          <div className="landing-logo">
            HM
          </div>

          <div className="landing-brand-text">

            <strong>
              HiVeMind
            </strong>

            <span>
              INDUSTRIAL INTELLIGENCE
            </span>

          </div>

        </div>


        <div className="landing-status">

          <span className="status-dot"></span>

          SYSTEM ONLINE

        </div>

      </header>


      <main className="landing-main">

        <section className="landing-copy">

          <p className="landing-kicker">
            INDUSTRIAL SERVICE OPERATIONS / 01
          </p>


          <h1>
            RUN
            <br />
            <span>
              SMARTER.
            </span>
          </h1>


          <p className="landing-description">

            The intelligence layer connecting machines,
            technicians, service requests and resources
            into one operational system.

          </p>


          <button
            className="landing-enter"
            onClick={onEnter}
          >

            <span>
              ENTER OPERATIONS
            </span>

            <span className="button-arrow">
              ↗
            </span>

          </button>


          <div className="hero-meta">

            <span>
              HVM / 001
            </span>

            <span>
              INTELLIGENCE ACTIVE
            </span>

            <span>
              2026
            </span>

          </div>

        </section>


        <section className="landing-visual">

          <div className="visual-grid"></div>

          <div className="visual-circle"></div>

          <div className="visual-line line-one"></div>

          <div className="visual-line line-two"></div>


          <div className="machine-system">

            <div className="machine-ring ring-one"></div>

            <div className="machine-ring ring-two"></div>


            <div className="machine-core">

              <span className="core-label">
                MACHINE
              </span>

              <strong>
                M-104
              </strong>

              <span className="core-status">
                ● ONLINE
              </span>

            </div>

          </div>


          <div className="machine-card">

            <div className="machine-card-top">
              FIELD UNIT / M-104
            </div>

            <div className="machine-status">
              OPERATIONAL
            </div>

            <div className="machine-location">
              SITE A · MOTOR SYSTEM
            </div>


            <div className="machine-data">

              <div>
                <span>
                  HEALTH
                </span>

                <strong>
                  92%
                </strong>
              </div>


              <div>
                <span>
                  LOAD
                </span>

                <strong>
                  68%
                </strong>
              </div>


              <div>
                <span>
                  STATUS
                </span>

                <strong>
                  OK
                </strong>
              </div>

            </div>

          </div>


          <div className="data-tag tag-one">
            <span>01</span>
            SENSOR NETWORK
          </div>


          <div className="data-tag tag-two">
            <span>02</span>
            PREDICTIVE ENGINE
          </div>


          <div className="data-tag tag-three">
            <span>03</span>
            RESOURCE FLOW
          </div>


          <div className="big-number">
            24
          </div>


          <div className="coordinates">
            13°02'21"N
            <br />
            80°12'43"E
          </div>


          <div className="visual-index">
            SYSTEM / 01
          </div>

        </section>

      </main>


      <footer className="landing-footer">

        <div>
          <strong>24</strong>
          <span>EQUIPMENT</span>
        </div>


        <div>
          <strong>12</strong>
          <span>OPEN REQUESTS</span>
        </div>


        <div>
          <strong>08</strong>
          <span>TECHNICIANS</span>
        </div>


        <div>
          <strong>05</strong>
          <span>LOW STOCK</span>
        </div>


        <div className="scroll-text">

          <span>
            ENTER SYSTEM
          </span>

          <strong>
            ↓
          </strong>

        </div>

      </footer>

    </div>

  );
}


export default Landing;