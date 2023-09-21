const teamHover = document.querySelectorAll('.isi-t-s-3-1-1, .isi-t-s-3-1-2, .isi-t-s-3-1-3, .isi-t-s-3-1-4, .isi-t-s-3-1-5, .isi-t-s-3-1-6');

    teamHover.forEach(teamMember => {
        teamMember.addEventListener('mouseover', () => {
            teamMember.style.transform = 'scale(1.1)';
            teamMember.style.transition = '0.3s';
        });

        teamMember.addEventListener('mouseout', () => {
            teamMember.style.transform = 'scale(1)';
        });
    });
