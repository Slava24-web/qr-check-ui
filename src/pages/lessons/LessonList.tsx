import React from 'react';

type LessonType = {
    discipline: string
    theme: string
}

const LessonList: React.FC = () => {
    const lessons: LessonType[] = JSON.parse(localStorage.getItem('lessons') || '[]');
    console.log(lessons)
    return (
        <>
            {
                lessons.map((lesson: LessonType) => (
                    <div>

                    </div>
                ))
            }
        </>
    );
};

export default LessonList;
