import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './Profile'
import { Article } from './Article'
import { Session } from './Session'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ unique: true })
	phone: string

	@Column()
	password: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: string

	@Column({ nullable: true })
	authStrategy: string

	@OneToOne(() => Profile)
	@JoinColumn()
	profile: Profile

	@OneToMany(() => Article, (article) => article.user)
	articles: Article[]

	@OneToMany(() => Session, (session) => session.user)
	sessions: Session[]
}
