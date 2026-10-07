import "./Landing.css";

function Landing({ onEnter }) {
  return (
    <div className="landing">

      <header className="landing-nav">

        <div className="landing-brand">
          <div className="landing-logo">
            DQ
          </div>

          <div className="landing-brand-text">
            <strong>DATAQUEST</strong>
            <span>HIVEMIND</span>
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
            <span>SMARTER.</span>
          </h1>

          <p className="landing-description">
            A unified operations platform for equipment,
            service requests, technicians and resources.
          </p>

          <button
            className="landing-enter"
            onClick={onEnter}
          >
            <span>ENTER OPERATIONS</span>
            <span>→</span>
          </button>

        </section>


        <section className="landing-visual">

          <div className="visual-grid"></div>

          <div className="visual-circle"></div>

          <div className="visual-line line-one"></div>

          <div className="visual-line line-two"></div>

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

          </div>

          <div className="big-number">
            24
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
          ENTER SYSTEM ↓
        </div>

      </footer>

    </div>
  );
}

export default Landing;